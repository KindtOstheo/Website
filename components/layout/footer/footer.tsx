import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram, AiFillMail, AiFillPhone } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im"
import { Container } from "../../util/container";
import { useTheme } from "..";
import { Icon } from "../../util/icon";
import { tinaField } from "tinacms/dist/react";

export const Footer = ({ data, icon, rawData }) => {
  const theme = useTheme();
  const socialIconClasses = "h-7 w-auto";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100",
  };
  const Styles = {
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };


  return (
    <footer style={Styles.color}>
      <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="/"
            className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap"
          >
          {icon.b_icon ?
            <Icon
              parentColor={data.color}
              data={{
                name: icon.name,
                color: data.color === "primary" ? "primary" : icon.color,
                style: icon.style,
              }}
              className="inline-block h-10 w-auto group-hover:text-orange-500"
            /> :
            <Image
                src={icon.image ? icon.image : ""}
                width={80}
                height={80}
                data-tina-field={tinaField(icon, 'image')} alt={""}            />
          }
          </Link>
          <div className="flex flex-col items-center">
            <p>Copyright Dominique Kindt de 2023 au present</p>
            {data.nav &&
            data.nav.map((item, i) => {
              return (
                <><Link
                  key={i}
                  data-tina-field={tinaField(item, "label")}
                  href={`/${item.href}`}
                  className="relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out color hover:bg-[#9e6851] hover:text-black py-4 px-4"
                >
                  {item.label}
                </Link></>
              )
            })} 
          </div>
          <div className="flex gap-4">
            {data.social && data.social.facebook && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.facebook}
                target="_blank"
              >
                <FaFacebookF
                  className={`${socialIconClasses} `}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.twitter && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.twitter}
                target="_blank"
              >
                <FaTwitter
                  className={`${socialIconClasses}`}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.instagram && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.instagram}
                target="_blank"
              >
                <AiFillInstagram
                  className={`${socialIconClasses}`}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.github && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.github}
                target="_blank"
              >
                <FaGithub
                  className={`${socialIconClasses} `}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.mail && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={'mailto:'+data.social.mail}
                target="_blank"
              >
                <AiFillMail
                  className={`${socialIconClasses} `}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.phone && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={'tel:'+data.social.phone}
                target="_blank"
              >
                <AiFillPhone
                  className={`${socialIconClasses}`}
                  style={Styles.color}
                />
              </a>
            )}
            {data.social && data.social.loc && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.loc}
                target="_blank"
              >
                <ImLocation2
                  className={`${socialIconClasses}`}
                  style={Styles.color}
                />
              </a>
            )}
          </div>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent top-0 left-4 right-4 opacity-5`}
        ></div>
      </Container>
    </footer>
  );
};
