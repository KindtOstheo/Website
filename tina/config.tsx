import { defineConfig } from "tinacms";
import { contentBlockSchema } from "../components/blocks/content";
import { bannerBlockSchema } from "../components/blocks/banner"
import { featureBlockSchema } from "../components/blocks/features";
import { heroBlockSchema } from "../components/blocks/hero";
import { testimonialBlockSchema } from "../components/blocks/testimonial";
import { ColorPickerInput } from "./fields/color";
import { iconSchema } from "../components/util/icon";
import { specialityBlockSchema } from "../components/blocks/speciality";

const indexerToken =process.env.INDEXERTOKEN;

const config = defineConfig({
  clientId: process.env.CLIENTID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD! // Netlify branch env
    || "main",
  token: process.env.TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  search: {
    tina: {
      indexerToken,
      stopwordLanguages: ['fra']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename}`;
          },
        },
        fields: [
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            required: true,
            description: 'Si cette case est cochée, le blog ne sera pas publié.',
          },
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            label: "Importance",
            name: "weight",
            required: true,
          },
          {
            type: "image",
            name: "heroImg",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            label: "Extrait de l'article",
            name: "excerpt",
          },
          {
            type: "reference",
            label: "Author",
            name: "author",
            collections: ["author"],
          },
          {
            type: "reference",
            label: "Catégorie",
            name: "category",
            collections: ["category"],
          },
          {
            type: "datetime",
            label: "Posted Date",
            name: "date",
            ui: {
              dateFormat: "MMMM DD YYYY",
              timeFormat: "hh:mm A",
            },
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              {
                name: "Space",
                label: "Espace",
                fields: [
                  {
                    name: "height",
                    label: "Hauteur de l'espace en px",
                    type: "number",
                    ui:{
                      validate: (val)=>{
                          if(val < 0 ) {
                              return 'Le nombre doit etre plus grand ou egale a 0'
                          }
                      }
                    }
                  }
                ]
              },
              {
                name: "BlockQuote",
                label: "Citation",
                fields: [
                  {
                    name: "children",
                    label: "Quote",
                    type: "rich-text",
                  },
                  {
                    name: "authorName",
                    label: "Author",
                    type: "string",
                  },
                  {
                    type: "string",
                    name: "position",
                    label: "Alignement",
                    options: [{
                        value: "center",
                        label: "Centre"
                      }, {
                        value: "end",
                        label: "Droite"
                      }, {
                        value: "start",
                        label: "Gauche"
                      }]
                },
                ],
              },
              {
                name: "ImagesHeight",
                label: "Image avec hauteur paramétrable ",
                fields:[
                  {
                      name: "src",
                      label: "Image",
                      type: "image",
                  },
                  {
                      name: "title",
                      label: "Titre de l'image",
                      type: "string",
                  },
                  {
                      name: "height",
                      label: "Hauteur de l'image en px",
                      type: "number",
                  },
                ]
              },
              // {
              //   name: "NewsletterSignup",
              //   label: "Newsletter Sign Up",
              //   fields: [
              //     {
              //       name: "children",
              //       label: "CTCitation A",
              //       type: "rich-text",
              //     },
              //     {
              //       name: "placeholder",
              //       label: "Placeholder",
              //       type: "string",
              //     },
              //     {
              //       name: "buttonText",
              //       label: "Button Text",
              //       type: "string",
              //     },
              //     {
              //       name: "disclaimer",
              //       label: "Disclaimer",
              //       type: "rich-text",
              //     },
              //   ],
              //   ui: {
              //     defaultItem: {
              //       placeholder: "Enter your email",
              //       buttonText: "Notify Me",
              //     },
              //   },
              // },
              {
                name: "Youtube",
                label: "Video Youtube",
                fields:[
                  {
                      name: "url",
                      label: "Id de la video",
                      type: "string",
                      ui: {
                          description: "Récupérer le lien de la vidéo sur YouTube https://www.youtube.com/watch?v=AnuHskLUPL0 et récupérer l'id exemple avec ce lien l'id est AnuHskLUPL0"
                      }
                  },
                  {
                      name: "title",
                      label: "Titre de la video",
                      type: "string",
                  },
                ]
              },
              {
                name: "DateTime",
                label: "Date & Heure",
                inline: true,
                fields: [
                  {
                    name: "format",
                    label: "Format",
                    type: "string",
                    options: ["utc", "iso", "local"],
                  },
                ],
              },
            ],
            
            isBody: true,
          },
        ],
        indexes: [{
          name: "category-weight-date",
          fields: [
            { name:"category" },
            { name:"weight" },
            { name:"date" }
          ]
        }]
      },
      {
        label: "Global",
        name: "global",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            label: "Header",
            name: "header",
            fields: [
              iconSchema as any,
              {
                type: "string",
                label: "Name",
                name: "name",
              },
              // {
              //   type: "string",
              //   label: "Color",
              //   name: "color",
              //   options: [
              //     { label: "Default", value: "default" },
              //     { label: "Primary", value: "primary" },
              //   ],
              // },
              {
                type: "object",
                label: "Nav Links",
                name: "nav",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                  defaultItem: {
                    href: "home",
                    label: "Home",
                  },
                },
                fields: [
                  {
                    type: "string",
                    label: "Link",
                    name: "href",
                  },
                  {
                    type: "string",
                    label: "Label",
                    name: "label",
                  },
                ],
              },
              {
                type: "string",
                label: "Couleur du texte",
                name: "color",
                ui: {
                  component: 'color',
                  colorFormat: 'hex',
                  colors: ['#222222', '#241748', '#000000', '#ffffff'],
                  widget: 'block',
                }
              },
              {
                type: "string",
                label: "Couleur d'arriere plan",
                name: "bg_color",
                ui: {
                  component: 'color',
                  colorFormat: 'hex',
                  colors: ['#d9d9d9', '#222222', '#000000', '#ffffff'],
                  widget: 'block',
                }
              },
            ],
          },
          {
            type: "object",
            label: "Footer",
            name: "footer",
            fields: [
              {
                type: "string",
                label: "Color",
                name: "color",
                ui: {
                  component: 'color',
                  colorFormat: 'hex',
                  colors: ['#8f6e5d','#d9d9d9', '#222222', '#000000', '#ffffff'],
                  widget: 'block',
                }
              },
              {
                type: "object",
                label: "Social Links",
                name: "social",
                fields: [
                  {
                    type: "string",
                    label: "Facebook",
                    name: "facebook",
                  },
                  {
                    type: "string",
                    label: "Twitter",
                    name: "twitter",
                  },
                  {
                    type: "string",
                    label: "Instagram",
                    name: "instagram",
                  },
                  {
                    type: "string",
                    label: "Github",
                    name: "github",
                  },
                  {
                    type: "string",
                    label: "Mail ",
                    name: "mail",
                  },
                  {
                    type: "string",
                    label: "Telephone",
                    name: "phone",
                  },
                  {
                    type: "string",
                    label: "Localisation",
                    name: "loc",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            label: "Theme",
            name: "theme",
            // @ts-ignore
            fields: [
              // {
              //   type: "string",
              //   label: "Primary Color",
              //   name: "color",
              //   ui: {
              //     component: ColorPickerInput,
              //   },
              // },
              {
                type: "string",
                name: "font",
                label: "Font Family",
                options: [
                  {
                    label: "System Sans",
                    value: "sans",
                  },
                  {
                    label: "Nunito",
                    value: "nunito",
                  },
                  {
                    label: "Lato",
                    value: "lato",
                  },
                ],
              },
              {
                type: "object",
                name: "font_size",
                label: "Taille de Police",
                fields: [
                  {
                    type: "string",
                    name: "base",
                    label: "Base",
                  },
                  {
                    type: "number",
                    name: "scale",
                    label: "Scale",
                  },
                ],
              },
              // {
              //   type: "string",
              //   name: "darkMode",
              //   label: "Dark Mode",
              //   options: [
              //     {
              //       label: "System",
              //       value: "system",
              //     },
              //     {
              //       label: "Light",
              //       value: "light",
              //     },
              //     {
              //       label: "Dark",
              //       value: "dark",
              //     },
              //   ],
              // },
            ],
          },
        ],
      },
      {
        label: "Authors",
        name: "author",
        path: "content/authors",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            label: "Avatar",
            name: "avatar",
          },
        ],
      },
      {
        label: "Catégorie",
        name: "category",
        path: "content/category",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true,
          },
        ],
      },
      {
        label: "Pages",
        name: "page",
        path: "content/pages",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            if (document._sys.filename === "about") {
              return `/about`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description:
              "The title of the page. This is used to display the title in the CMS",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            ui: {
              visualSelector: true,
            },
            templates: [
              bannerBlockSchema,
              heroBlockSchema,
              // @ts-ignore
              featureBlockSchema,
              contentBlockSchema,
              testimonialBlockSchema,
              specialityBlockSchema,
            ],
          },
        ],
      },
    ],
  },
});

export default config;
