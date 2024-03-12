/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";
import { PostType } from "../../pages/posts/[filename]";
import { tinaField } from "tinacms/dist/react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";
import Link from "next/link";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
    position: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
  Youtube: {
    url: string;
    title: string;
  };
  ImagesHeight: {
    src: string;
    title: string;
    height: number;
  };
  Space: {
    height: number;
  };
  Listing: {
    type: string;
    font: string;
    list: {txt:string}[];
  };
}> = {
  code_block: (props) => <Prism {...props} />,
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
    position: string;
  }) => {
    const Styles = {
        textAlign: (props.position ? props.position : 'center') as any
    };
    return (
      <div>
        <blockquote className="rounded-xl border border-border-secondary border-white bg-body px-8 py-3  italic" style={Styles}>
          <TinaMarkdown content={props.children} />
          <span className={`m-0 block border-t border-border-secondary not-italic border-white pt-3 text-base font-normal text-text after:hidden ${props.authorName ? "":"hidden"}`}>
            {props.authorName}
          </span>
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{format(dt, "yyyy-MM-dd")}</span>;
      case "utc":
        return <span>{format(dt, "eee, dd MMM yyyy HH:mm:ss OOOO")}</span>;
      case "local":
        return <span>{format(dt, "P")}</span>;
      default:
        return <span>{format(dt, "P")}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 ">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => (
    <span className="flex items-center justify-center">
      <img src={props.url} alt={props.alt} />
    </span>
  ),
  Youtube: (props)  => (
    <div className="overflow-hidden rounded-xl">
    <LiteYouTubeEmbed id={props.url} title={props.title} />
  </div>
  ),
  ImagesHeight: (props) => (
    <div className= 'w-auto relative' style={{height: props.height}}>
      <Image
        src={props.src}
        fill={true}
        alt={props.title}
        priority={true}
        className="unset"
        style={{objectFit: "contain"}}
      />
    </div>
  ),
  Space: (props) => (
    <div style={{height: props.height+'px'}} className={`h-[${props.height}px]`}></div>
  ),
  Listing: (props) => (
    <div className={`${props.font}`}>
      <ol style={{listStyle:props.type}}>
        {props.list &&
        props.list.map((item,i)=> {
          return (
            <li key={`${i}`}>
              {item.txt}
            </li>
          )
        })}
      </ol>
    </div>
  ),
};

export const Post = ({props, action}:{props: PostType, action:any}) => {

  const Styles = {
    color :{
      color: "#222222",
      background:'#d9d9d9'
    },
    title :{
      fontSize: props.f_title ? props.f_title : 61,
      fontWeight: (props.w_title ? props.w_title : 700) as any,
    },
    subtitle: {
      fontSize: props.f_subtitle ? props.f_subtitle : 40,
      fontWeight: (props.w_subtitle ? props.w_subtitle : "700") as any,
    }
  };

  const date = new Date(props.date);
  let formattedDate = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "dd/MM/yyyy");
  }

  return (
    <Section className="flex-1" color={Styles.color}>
      <Container width="small" className={`flex-1 pb-2`} size="large">
        <h2
          style={Styles.title}
          data-tina-field={tinaField(props, "title")}
          className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text bg-gradient-to-r`}
          >
            {props.title}
          </span>
        </h2>
        { props.subtitle && (
          <p  className="text-center" data-tina-field={tinaField(props, 'subtitle')}
          style={Styles.subtitle}
          >{props.subtitle}</p>
        )}
        
        <div
          data-tina-field={tinaField(props, "author")}
          className="flex items-center justify-center mb-16"
        >
          {props.author && (
            <>
              <div className="flex-shrink-0 mr-4">
                <img
                  data-tina-field={tinaField(props.author, "avatar")}
                  className="h-14 w-14 object-cover rounded-full shadow-sm"
                  src={props.author.avatar}
                  alt={props.author.name}
                />
              </div>
              <p
                data-tina-field={tinaField(props.author, "name")}
                className="text-base font-medium"
              >
                {props.author.name}
              </p>
              <span className="font-bold  mx-2">
                —
              </span>
            </>
          )}
          <p
            data-tina-field={tinaField(props, "date")}
            className="text-base "
          >
            {formattedDate}
          </p>
        </div>
      </Container>
      {props.heroImg && (
        <div className="px-4 w-full">
          <div
            data-tina-field={tinaField(props, "heroImg")}
            className="relative max-w-4xl lg:max-w-5xl mx-auto"
          >
            <img
              src={props.heroImg}
              className="absolute block rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
              aria-hidden="true"
            />
            <figure>

              <img
                src={props.heroImg}
                alt={props.title}
                className="relative z-10 mb-14 block rounded-lg w-full h-auto opacity-100"
              />
               <figcaption className="z-10 mt-4 text-sm italic text-gray-600">
                  {props.figcaption}
                </figcaption>
            </figure>
          </div>
        </div>
      )}
      <Container className={`flex-1 pt-4`} width="small" size="large">
        <div
          data-tina-field={tinaField(props, "_body")}
          className="w-full max-w-none"
          id="TinaMarkdown"
        >
          <TinaMarkdown components={components} content={props._body} />

        </div>
      </Container>
      <div className={`flex flex-wrap items-center gap-y-4 gap-x-6 justify-around`}>
        <Link href={!action.before.filename ?  "/" : action.before.filename }>
          <button type="button" className={`
          text-gray-800 bg-white  bg-gradient-to-r from-gray-300 to-gray-400 hover:to-gray-300 hover:bg-gray-100
          z-10 relative flex items-center px-7 py-3 font-semibold text-lg transition duration-150 ease-out  rounded-lg transform focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap`}>
            <BiLeftArrowAlt
              className={`mr-1 -ml-1 w-6 h-6 opacity-80`}
            />
            {!action.before.name ? "Accueil" : action.before.name}
          </button>
        </Link>
        <Link href={!action.after.filename ?  "/" : action.after.filename }>
          <button type="button" className={`
          text-gray-800 bg-white  bg-gradient-to-r from-gray-300 to-gray-400 hover:to-gray-300 hover:bg-gray-100
          z-10 relative flex items-center px-7 py-3 font-semibold text-lg transition duration-150 ease-out  rounded-lg transform focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 whitespace-nowrap`}>
            {!action.after.name ? "Accueil" : action.after.name}
              <BiRightArrowAlt
                className={`ml-1 -mr-1 w-6 h-6 opacity-80`}
              />
          </button>
        </Link>
      </div>
    </Section>
  );
};
