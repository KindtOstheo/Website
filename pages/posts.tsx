import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.data.postConnection.edges;
  const Styles = {
    color :{
      color: "#222222",
      background:'#d9d9d9'
    },
  };
  return (
    <Layout>
      <Section color={Styles.color} className="flex-1">
        <Container size="large" width="large" className=" flex flex-wrap flex-row justify-evenly content-center ">
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery({
    filter: { draft: { eq: false } },
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];
