import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { components } from "../util/component";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  
  const Styles = {
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };
  return (
    <Section color={Styles.color} >
      <Container
        style={Styles.color}
        className={`prose prose-lg`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown components={components} content={data.body} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      name: "id",
      label: "Identifiant",
      ui:{
        description: "Pour l'ancre on prend le lien dans la barre de recherche et on y ajoute #ID. Exemple : https://osteo-kindt.fr/#id "
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
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
          name: "Listing",
          label: "Liste",
          fields: [
            {
              name: "type",
              label: "Type de liste",
              type: "string",
              options: [{
                value: "decimal",
                label: "Numero"
              }, {
                value: "disc",
                label: "Rond"
              }]
            },
            {
              name: "font",
              label: "Police de liste",
              type: "string",
              options: [
                {
                  value: "h1",
                  label: "H1"
                }, {
                  value: "h2",
                  label: "H2"
                },{
                  value: "h3",
                  label: "H3"
                }, {
                  value: "h4",
                  label: "H4"
                },{
                  value: "h5",
                  label: "H5"
                }, {
                  value: "h6",
                  label: "H6"
                }, {
                  value: "p",
                  label: "Paragraph"
                }
              ]
            },
            {
              type: "object",
              name: "list",
              label: "Liste",
              list: true,
              ui: {
                itemProps: (item) => {
                    return { label: item?.txt };  
                },
              },
              fields: [
                {
                  type: "string",
                  label: "text",
                  name: "txt",
                },
              ],
            }
          ]
        },
      ]
    },
    {
      type: "string",
      label: "Couleur du texte",
      name: "color",
      ui: {
        component: 'color',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        colorFormat: 'hex',
        colors: ['#d9d9d9', '#222222', '#000000', '#ffffff'],
        widget: 'block',
      }
    },
  ],
};
