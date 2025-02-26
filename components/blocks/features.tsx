import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { iconSchema } from "../util/icon";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination"
import { components } from "../util/component";
import PrevButton from "../util/PrevButton";
import NextButton from "../util/NexButton";

export const Feature = ({
  featuresColor,
  data,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="flex-1 flex flex-col gap-6 pb-20 pt-5 px-7 text-center items-center max-w-xl mx-auto h-[94%] m-4 rounded-md border border-transparent shadow-[0px_4px_25px_rgba(0,0,0,.05)] hover:shadow-non hover:border-[#4a4a4a]"
      style={{ flexBasis: "16rem" }}
    >
      {data.icon && (
        <Icon
          tinaField={tinaField(data, "icon")}
          parentColor={featuresColor}
          data={{ size: "xxl", ...data.icon }}
        />
      )}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font swiper-no-swiping"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="swiper-no-swiping text-base opacity-80 leading-relaxed"
        >
          <TinaMarkdown components={components} content={data.text} />
        </div>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  const Styles = {
    feature : {
      fontSize: data.f_title ? data.f_title : 48,
      fontWeight: (data.w_title ? data.w_title : 700) as any,
      textAlign: (data.a_title ? data.a_title : "center") as any
    },
    feature_desc : {
      fontSize: data.f_description ? data.f_description : 16,
      textAlign: (data.a_title ? data.a_title : "center") as any
    },
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Section color={Styles.color} >
      { data.feature_title_activate &&
      <Container
        className={`gap-x-10 gap-y-8`}
        size="large"
        id={data.id}
      >
        <div className="animate">
            { data.feature_sub_title && <p className="uppercase" style={Styles.feature.textAlign} data-tina-field={tinaField(data, 'feature_sub_title')}>{data.feature_sub_title}</p>}
            { data.feature_title && <h2 className="mt-4 section-title " style={Styles.feature} data-tina-field={tinaField(data, 'feature_title')}>{data.feature_title}</h2>}
            { data.feature_description && <div className="mt-10" style={Styles.feature_desc} data-tina-field={tinaField(data, 'feature_description')}>
            <TinaMarkdown components={components} content={data.feature_description} /> 
            </div>}
        </div>
      </Container>
      }
      <Container
        className={`flex flex-wrap gap-x-10 gap-y-8 text-left`}
        size="large"
        data-tina-field={tinaField(data, 'f_description')}
      >
        <Swiper 
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        className="mySwiper"
        spaceBetween={20}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}

        modules={[Pagination, Navigation]}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        >
          {data.items &&
            data.items.map(function (block, i) {
              if (block.feature_draft) {
                return <SwiperSlide key={i} data-tina-field={tinaField(block, 'icon')} 
                      className="max-w-lg"
                        style={{height: "unset"}}>
                  <Feature featuresColor={data.color} key={i} data={block} />
                </SwiperSlide>;
              }
            })
          }
        </Swiper>
        <PrevButton swiperRef={swiperRef} /> {/* Pass the ref to PrevButton */}
        <NextButton swiperRef={swiperRef} /> {/* Pass the ref to NextButton */}
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: {type: 'root',children: [{type: 'p',children: [{type: 'text', text: "This is where you might talk about the feature, if this wasn't just filler text.",},],},],},
  icon: {
    color: "",
    style: "float",
    name: "",
  },
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "boolean",
      name: "feature_title_activate",
      label: "Activer la section titre des caractéristiques",
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
      name: "feature_title",
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
        name: "feature_sub_title",
        label: "Sous Titre",
    },
    {
        type: "rich-text",
        name: "feature_description",
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
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          if (item?.feature_draft) {
            return { label: item?.title };
          }
          else {
            return { label: item?.title, style: {backgroundColor: "#9691a5"} };
          }
          
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        {
          type: "boolean",
          name: "feature_draft",
          label: "Activer la pour afficher la feature",
        },
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
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
                  },
                  {
                    value: "none",
                    label: "aucun"
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
      ],
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
