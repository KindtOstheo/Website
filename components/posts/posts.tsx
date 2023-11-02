import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { PostsType } from "../../pages/posts";
import Image from "next/image";

export const Posts = ({ data }: { data: PostsType[] }) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };
  const Styles = {
    color :{
      color: "#222222",
      background:'#d9d9d9'
    },
  };

  return (
    <>
      {data.map((postData) => {
        const post = postData.node;
        const date = new Date(post.date);
        let formattedDate = "";
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "dd/MM/yyyy");
        }
        return (
          <Link
            key={post._sys.filename}
            href={`/posts/` + post._sys.filename}
            style={Styles.color}
            className="shadow-[0_10px_35px_rgba(0,0,0,.05)] md:w-5/12 group block px-6 sm:px-8 md:px-10 py-10 mb-8 last:mb-0 rounded-md transition-all duration-150 ease-out hover:shadow-md "
          >
            { post.heroImg && <img src={post.heroImg} alt={post.title} className="max-h-52 m-auto"/> }
            <div>
              <h3
                className={`text-3xl lg:text-4xl font-semibold title-font mb-5 transition-all duration-150 ease-out `}
              >
                {post.title}{" "}
                <span className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <BsArrowRight className="inline-block h-8 -mt-1 ml-1 w-auto opacity-70" />
                </span>
              </h3>
              <div className=" w-full max-w-none mb-5 opacity-70">
                <TinaMarkdown content={post.excerpt} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-2">
                    <img
                      className="h-10 w-10 object-cover rounded-full shadow-sm"
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                    />
                  </div>
                  <p className="text-base font-medium">
                    {post?.author?.name}
                  </p>
                  {formattedDate !== "" && (
                    <>
                      <span className="font-bold text-gray-500 mx-2">
                        —
                      </span>
                      <p className="text-base ">
                        {formattedDate}
                      </p>
                    </>
                  )}
                </div>
                <h2 className="pt-0.5 pb-1.5 px-2 rounded-md text-sm text-white subpixel-antialiased font-medium bg-gray-900 cursor-pointer">{post.category.name}</h2>

              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
