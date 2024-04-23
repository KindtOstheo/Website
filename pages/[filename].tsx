import React from "react";
import { InferGetStaticPropsType } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props.content);
  const category  = props.category;
  const seo= {
    title: data.page.seo?.title ? data.page.seo.title : "Dominique Kindt",
    description: data.page.seo?.description ? data.page.seo.description : "Dominique Kindt, Vous Accueille au cabinet. Prise de RDV par téléphone. Votre Ostéopathe agréé à Draguignan. Du bébé à l'adulte. Sciatique. Préventif.",
    url: data.page.seo?.url ? data.page.seo.url : "",
  }
  return (
    <Layout rawData={data} data={data.global as any} category={category.data.categoryConnection as any} seo={seo as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.mdx`,
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  const category = await client.queries.categoryConnection({
    "filter": {"enable": {"eq": true }},
    sort:"weight-name"
  });
  return {
    props: {
      content: JSON.parse(JSON.stringify(props)) as typeof props,
      category: JSON.parse(JSON.stringify(category)) as typeof category,
    } 
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename },
    })),
    fallback: false,
  };
};
