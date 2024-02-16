import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import { title } from "process";
import { url } from "inspector";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.data.postConnection.edges;
  const category = useTina(props.category)

  const Styles = {
    color :{
      color: "#222222",
      background:'#d9d9d9'
    },
  };
  const seo= {
    title: "Notre Blogs",
    description: "Dominique Kindt, Vous Accueille au cabinet. Prise de RDV par téléphone. Votre Ostéopathe agréé à Draguignan. Du bébé à l'adulte. Sciatique. Préventif.",
    url: "",
  }
  return (
    <Layout category={category.data.categoryConnection as any} seo={seo as any}>
      <Section color={Styles.color} className="flex-1">
        <Container size="large" width="large" className=" flex flex-wrap flex-col justify-evenly content-center ">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery({
    filter: { draft: { eq: false } },
    sort:"category-weight-date"
  });
  const category = await client.queries.categoryConnection({
    "filter": {"enable": {"eq": true }},
    sort:"weight-name"
  });
  return {
    props: {
      ...tinaProps,
      category: JSON.parse(JSON.stringify(category)) as typeof category,
    },
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];