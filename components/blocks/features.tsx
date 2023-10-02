import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { iconSchema } from "../util/icon";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";


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
      className="flex-1 flex flex-col gap-6 py-16 px-7 text-center items-center max-w-xl mx-auto h-[94%] m-4 rounded-md border border-transparent shadow-[0px_4px_25px_rgba(0,0,0,.05)] hover:shadow-non hover:border-[#4a4a4a]"
      style={{ flexBasis: "16rem" }}
    >
      {data.icon && (
        <Icon
          tinaField={tinaField(data, "icon")}
          parentColor={featuresColor}
          data={{ size: "large", ...data.icon }}
        />
      )}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="text-base opacity-80 leading-relaxed"
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  const Styles = {
    feature : {
      fontSize: data.f_title ? data.f_title : 48,
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
  return (
    <Section color={Styles.color} >
      { data.feature_title_activate &&
      <Container
        className={`gap-x-10 gap-y-8`}
        size="large"
        data-tina-field={tinaField(data)}
      >
        <div className="animate">
            { data.feature_sub_title && <p className="uppercase" style={Styles.feature.textAlign} data-tina-field={tinaField(data, 'feature_sub_title')}>{data.feature_sub_title}</p>}
            { data.feature_title && <h2 className="mt-4 section-title" style={Styles.feature} data-tina-field={tinaField(data, 'feature_title')}>{data.feature_title}</h2>}
            { data.feature_description && <div className="mt-10" style={Styles.feature_desc} data-tina-field={tinaField(data, 'feature_description')}> <TinaMarkdown content={data.feature_description} /></div>}
        </div>
      </Container>
      }
      <Container
        className={`flex flex-wrap gap-x-10 gap-y-8 text-left`}
        size="large"
        data-tina-field={tinaField(data, 'f_description')}
      >
        <Swiper 
        className="mySwiper"
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}

        modules={[Pagination]}
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
              return <SwiperSlide key={i} data-tina-field={tinaField(block, 'icon')} 
                      className="" 
                        style={{height: "unset", margin:"1rem"}}>
                  <Feature featuresColor={data.color} key={i} data={block} />
                </SwiperSlide>;
            })
          }
        </Swiper>
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
        name: "feature_sub_title",
        label: "Sous Titre",
    },
    {
        type: "rich-text",
        name: "feature_description",
        label: "Description",
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
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
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
