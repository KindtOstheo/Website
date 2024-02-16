import { TinaField } from "tinacms";



export const expertSeoPageProps: TinaField = {
    name: "seo",
    label: "SEO",
    type: "object",
    fields: [
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
            ui: {
                component: "textarea",
            },
        },
        {
            type: "image",
            label: "Url",
            name: "url",
            required: true,
        },
    ],
  };