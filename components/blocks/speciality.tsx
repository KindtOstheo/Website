import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksSpeciality, PageBlocksSpecialityList } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { components } from "../util/component";


export const Speciality = ({
  index,
  item,
}: {
  index: number;
  item: PageBlocksSpecialityList;
}) => {

  const Styles = {
    subtitle : {
      fontSize: item?.f_subtitle ? item.f_subtitle : 20,
      fontWeight: (item?.w_subtitle ? item?.w_subtitle : 700) as any,
      textAlign: (item?.a_subtitle ? item.a_subtitle : "center") as any
    },
    title : {
      fontSize: item?.f_title ? item.f_title : 40,
      fontWeight: (item?.w_title ? item?.w_title : 700) as any,
      textAlign:(item?.a_title ? item.a_title : "center") as any
    },
  };

  return (
    <div className="row items-center justify-center my-6 flex flex-wrap-reverse odd:flex-row-reverse" key={"speciality-" + index} data-tina-field={tinaField(item)} id={item.id}>
      <div className="animate w-full md:w-3/6 lg:order-1 m-auto"  data-tina-field={tinaField(item, 'image')}>
        <Image
          className="mx-auto"
          src={item?.image ? item.image : ""}
          width={575}
          height={511}
          alt={"speciality-" + index}
          
          priority={undefined}/>
      </div>
      <div className="animate w-full md:w-3/6 lg:order-2 m-auto">
        <p data-tina-field={tinaField(item, 'subtitle')}
          style={Styles.subtitle}
        >{item?.subtitle}</p>
        <h2 
          className={`mt-4 section-title bar-${item?.a_title ? item.a_title : "center"}`}
          data-tina-field={tinaField(item, 'title')}
          style={Styles.title}
        >
          {item?.title}
        </h2>
        <div 
          className="mt-10 TinaMarkdown" 
          data-tina-field={tinaField(item, 'description')}
          style={{
            fontSize: item?.f_description ? item.f_description : 16,
          }}
        > 
          <TinaMarkdown components={components} content={item?.description} />
        </div>
      </div>
    </div>
  );
};


export const Specialitys = ({ data }: { data: PageBlocksSpeciality }) => {
  const Styles = {
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };
  return (
    <Section color={Styles.color}>
      <Container
        style={Styles.color}
        className={`prose prose-lg`}
        size="large"
        width="large"
      >
       {data.list &&
          data.list.map(function (item, i) {
            if (item.speciality_draft) {
              return <Speciality key={i} item={item} index={i} />;
            }
          })}
      </Container>
    </Section>
  );
};

const defaultSpeciality = {
  title: "Here's Another speciality",
  subtitle: "sub speciality",
  description: {type: 'root',children: [{type: 'p',children: [{type: 'text', text: "This is where you might talk about the feature, if this wasn't just filler text.",},],},],},
  image: "/blocks/spec.png",
};

export const specialityBlockSchema: Template = {
  name: "speciality",
  label: "Specialité",
  ui: {
    previewSrc: "/blocks/spec.png",
    defaultItem: {
      color: "primary",
      list: [defaultSpeciality, defaultSpeciality, defaultSpeciality],
    },
  },
  fields: [
    {
      type: "object",
      name: "list",
      label: "Liste",
      list: true,
      ui: {
          itemProps: (item) => {
            if (item?.speciality_draft) {
              return { label: item?.title };
            }
            else {
              return { label: item?.title, style: {backgroundColor: "#9691a5"} };
            }
          // Field values are accessed by title?.<Field name>
          },
          defaultItem: {
            ...defaultSpeciality,
          },
      },
      fields: [
          {
            type: "boolean",
            name: "speciality_draft",
            label: "Activer la pour afficher la specialiter",
          },
          {
            type: "string",
            name: "id",
            label: "Identifiant",
            ui:{
              description: "Pour l'ancre on prend le lien dans la barre de recherche et on y ajoute #ID. Exemple : https://osteo-kindt.fr/#id "
            }
          },
          {
              type: "string",
              name: "title",
              label: "Titre",
          },
          {
              type: "string",
              name: "a_title",
              label: "Alignement du Titre",
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
          {
              label: "Taille Titre en px",
              name: "f_title",
              type: "number",
              ui:{
                  validate: (val)=>{
                      if(val <= 0 ) {
                          return 'Le nombre doit etre plus grand que 0'
                      }
                  }
              }
          },
          {
            type: "string",
            name: "w_title",
            label: "Niveaux de gras du Titre",
            options: [
              {
                value: "100",
                label: "Fin"
              },{
                value: "400",
                label: "Normal"
              }, {
                value: "600",
                label: "Medium"
              },{
                value: "700",
                label: "Gras"
              }, {
                value: "900",
                label: "Tres Gras"
              }]
          },
          {
              type: "string",
              name: "subtitle",
              label: "Sous Titre",
          },
          {
              type: "string",
              name: "a_subtitle",
              label: "Alignement du Sous Titre",
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
          {
              label: "Taille Sous Titre en px",
              name: "f_subtitle",
              type: "number",
              ui:{
                  validate: (val)=>{
                      if(val <= 0 ) {
                          return 'Le nombre doit etre plus grand que 0'
                      }
                  }
              }
          },{
            type: "string",
            name: "w_subtitle",
            label: "Niveaux de gras du Titre",
            options: [
              {
                value: "100",
                label: "Fin"
              },{
                value: "400",
                label: "Normal"
              }, {
                value: "600",
                label: "Medium"
              },{
                value: "700",
                label: "Gras"
              }, {
                value: "900",
                label: "Tres Gras"
              }]
          },  
          {
              type: "rich-text",
              name: "description",
              label: "Description",
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
              label: "Taille Description en px",
              name: "f_description",
              type: "number",
              ui:{
                  validate: (val)=>{
                      if(val <= 0 ) {
                          return 'Le nombre doit etre plus grand que 0'
                      }
                  }
              }
          }, 
          {
              type: "image",
              name: "image",
              label: "Image",
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
