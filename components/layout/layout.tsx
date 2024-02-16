import React from "react";
import Head from "next/head";
import Script from "next/script";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import layoutData from "../../content/global/index.json";
import { CategoryConnection, Global, PostSeo } from "../../tina/__generated__/types";
import { usePathname } from 'next/navigation'

export const Layout = ({
  rawData = {},
  data = layoutData,
  children,
  seo,
  category,
}: {
  rawData?: object;
  data?: Omit<Global, "id" | "_sys" | "_values">;
  children: React.ReactNode;
  seo?: PostSeo;
  category?: CategoryConnection
}) => {
  const pathname = usePathname()
  return (
    <>
      <Head>
        <title>{seo?.title} | Dominique Kindt</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={seo?.description} />
        <meta name=" robots" content=" index, follow"></meta>
        { seo && (
          <>
            {/* Open Graph SEO */}
            <meta property="og:locale" content="fr-FR" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.url} />
            <meta property="og:image:secure_url" content={seo.url} />
            <meta property="og:site_name" content="Kindt Dominique Ostéopathe " />
            <meta property="og:url" content={`https://osteo-kindt.fr/${pathname}`} />
          </>
          )}
        


        {data.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {data.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {/* <!-- Google tag (gtag.js) --> */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${data.gtag}`} />
        <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${data.gtag});
          `}
        </Script>
      </Head>
      <Theme data={data?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            data.theme.font === "nunito" && "font-nunito"
          } ${data.theme.font === "lato" && "font-lato"} ${
            data.theme.font === "sans" && "font-sans"
          }`}
        >
          <Header data={data?.header} category={category}/>
          <div className="flex-1 text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col">
            {children}
          </div>
          <Footer
            rawData={rawData}
            data={data?.footer}
            icon={data?.header.icon}
          />
        </div>
      </Theme>
    </>
  );
};
