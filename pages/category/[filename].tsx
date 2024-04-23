import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { Posts } from "../../components/posts";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { useTina } from "tinacms/dist/react";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const posts = props.data.postConnection.edges;
  const category = props.category
  const categorySeo= props.categorySeo

  const Styles = {
    color :{
      color: "#222222",
      background:'#d9d9d9'
    },
  };
  const seo= {
    title: categorySeo.data.categoryConnection.edges[0]?.node.seo?.title ? categorySeo.data.categoryConnection.edges[0]?.node.seo?.title : categorySeo.data.categoryConnection.edges[0]?.node.name,
    description: categorySeo.data.categoryConnection.edges[0]?.node.seo?.description ? categorySeo.data.categoryConnection.edges[0]?.node.seo?.description : categorySeo.data.categoryConnection.edges[0]?.node.description,
    url:categorySeo.data.categoryConnection.edges[0]?.node.seo?.url ? categorySeo.data.categoryConnection.edges[0]?.node.seo?.url : "",
  }
  return (
    <Layout category={category.data.categoryConnection as any} seo={seo as any}>
      <Section color={Styles.color} className="flex-1">
        {categorySeo.data.categoryConnection.edges[0].node.description && (
          <Container size="large" width="large" className=" flex flex-wrap flex-row justify-evenly content-center text-center">
            {categorySeo.data.categoryConnection.edges[0].node.description}
          </Container>
        )}
        <Container size="large" width="large" className=" flex flex-wrap flex-row justify-evenly content-center ">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}
export const getStaticPaths = async () => {
    const postsListCategory = await client.queries.categoryConnection();
    return {
        paths: postsListCategory.data.categoryConnection.edges.map((category) =>({
          params: {filename: category.node._sys.filename},
        })),
        fallback: "blocking",
    }
};

export const getStaticProps = async ({ params }) => {
  // console.log(params.filename);
  const tinaProps = await client.queries.pageQuery({
    filter: { draft: { eq: false }, category: {category: { name: { eq: params.filename }}}},
    sort:"category-weight-date"
  });
  const category = await client.queries.categoryConnection({
    "filter": {"enable": {"eq": true }},
    sort:"weight-name"
  });
  const categorySeo = await client.queries.categoryConnection(
    {"filter": {"name": {"eq": params.filename }}}
  );

  return {
    props: {
      ...tinaProps,
      category: JSON.parse(JSON.stringify(category)) as typeof category,
      categorySeo: JSON.parse(JSON.stringify(category)) as typeof categorySeo
    },
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];