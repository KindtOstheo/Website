import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { Posts } from "../../components/posts";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export async function getAllTags() {
    const category = await client.queries.categoryConnection();
    
    const itemTags = category.data.categoryConnection.edges
    .map((tag) => tag.node.name.trim().toLowerCase())
    let memo = []
    itemTags.forEach((tag) => {
         memo.push(tag)
    })
  
    return memo
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
  category,
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
        {/* <Container size="small" width="large" className="flex flex-wrap flex-row justify-evenly content-center">
          <div className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" role="group">
            <button
              key={"0"}
              onClick={document.querySelectorAll(".category").forEach(a=>a.classList.toggle("hidden"))}          
              type="button"
              className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 hover:bg-[#9e6851]">
              Tous
            </button>
            {categorys.map((data, i)=> {
              const category = data.node.name;
              return (
                <><button
                  key={i}
                  type="button"
                  className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700  hover:bg-[#9e6851]">
                  {category}
                </button></>
              );
            })} 
          </div>
        </Container> */}
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
  const tinaProps = await client.queries.pageQuery({
    filter: { draft: { eq: false }, category: {category: { name: { eq: params.filename }}}},
    sort:"category-weight-date"
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