import { Container } from "../util/container";
import { Section } from "../util/section";
import type { Template } from "tinacms";
import { PageBlocksBanner } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";

export const Banner = ({ data }: { data: PageBlocksBanner }) => {

  const Styles = {
    baner :{
      fontSize: data.f_title ? data.f_title : 61,
      textAlign: (data.a_title ? data.a_title : 'center') as any
    },
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };
  return (
    <Section color={Styles.color}>
      <Container
        className={`prose prose-lg`}
        size="large"
        width="large"
        style={Styles.color}
      >
        <div className="relative">
          <div className="row overflow-hidden rounded-2xl">
            <div className="col-12">
              <div className="row relative justify-center pb-5 ">
                { (data.b_title) &&
                  <div className="banner-content col-10 text-center" >
                    { data.b_title && 
                      <h1 className={`mb-8 banner-title opacity-1`} style={Styles.baner} data-tina-field={tinaField(data, 'title')} >
                        {data.title}
                      </h1>
                    }
                  </div>
                }
                { data.b_image &&
                  <div className="col-10">
                    <Image
                      className="banner-img opacity-1 m-auto"
                      src={data.banner_image ? data.banner_image : "/blocks/banner.png"}
                      width={1170}
                      height={666}
                      priority={true}
                      alt=""
                      data-tina-field={tinaField(data, 'banner_image')}
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const bannerBlockSchema: Template = {
  name: "banner",
  label: "Bannière",
  ui: {
    previewSrc: "/blocks/banner.png",
  },
  fields: [
    // {
    //   type: "string",
    //   label: "Color",
    //   name: "color",
    //   options: [
    //     { label: "Default", value: "default" },
    //     { label: "Tint", value: "tint" },
    //     { label: "Primary", value: "primary" },
    //   ],
    // },
    {
        type: "boolean",
        name: "b_title",
        label: "Activer titre",
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
        type: "boolean",
        name: "b_image",
        label: "Activer image",
    },
    {
        type: "image",
        name: "banner_image",
        label: "Image",
    },
    {
      type: "string",
      label: "Couleur du texte",
      name: "color",
      ui: {
        component: 'color',

      }
    },
    {
      type: "string",
      label: "Couleur d'arriere plan",
      name: "bg_color",
      ui: {
        component: 'color',
      }
    },
  ],
};
