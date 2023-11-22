import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition  } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();

  const Styles = {
    color :{
      color: data.color ? data.color : "#222222",
      background: data.bg_color ? data.bg_color : '#d9d9d9'
    },
  };

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Disclosure as="nav" className="relative overflow-hidden" style={Styles.color}>
      {({ open }) => (
        <>
          <div className="mx-auto my-4 max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#8d6e5e] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    href="/"
                    className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
                  >
                    {data.icon.name ?
                      <Icon
                        tinaField={tinaField(data, "icon")}
                        parentColor={data.color}
                        data={{
                          name: data.icon.name,
                          color: data.icon.color,
                          style: data.icon.style,
                        }}
                      /> :
                      <Image
                          src={data.icon.image ? data.icon.image : ""}
                          width={80}
                          height={80}
                          data-tina-field={tinaField(data.icon, 'image')} alt={""} />
                    }
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                  <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
                  {data.nav &&
                    data.nav.map((item, i) => {
                      const activeItem =
                      (item.href === "" ? router.asPath === "/" : router.asPath.includes(item.href)) && isClient;
                      return (
                    <li
                      key={`${item.label}-${i}`}
                    >
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:text-[#9e6851] py-8 px-4 ${
                          activeItem ? `text-[#8f6e5d]` : ``
                        }`}
                      >
                        {item.label}
                        {activeItem && (
                          <svg
                            className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2  opacity-10 dark:opacity-15`}
                            preserveAspectRatio="none"
                            viewBox="0 0 230 230"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="230"
                              y="230"
                              width="230"
                              height="230"
                              transform="rotate(-180 230 230)"
                              fill="url(#paint0_radial_1_33)"
                            />
                            <defs>
                              <radialGradient
                                id="paint0_radial_1_33"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                              >
                                <stop stopColor="currentColor" />
                                <stop
                                  offset="1"
                                  stopColor="currentColor"
                                  stopOpacity="0"
                                />
                              </radialGradient>
                            </defs>
                          </svg>
                        )}
                      </Link>
                    </li>
                    )})}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                (item.href === "" ? router.asPath === "/" : router.asPath.includes(item.href)) && isClient;
                return (
                <Disclosure.Button
                  key={`${item.label}-${i}`}
                  as="a"
                  href={`/${item.href}`}
                  className={classNames(
                    activeItem ? 'text-[#8f6e5d] hover:bg-[#a7a6a6]' : ' hover:bg-[#8d6e5e] hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={activeItem  ? 'page' : undefined}
                >
                  {item.label}
                </Disclosure.Button>
              )})}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
  // return (
  //   <div
  //     className={`relative overflow-hidden`}
  //     style={Styles.color}
  //   >
  //     <Container size="custom" className="py-0 relative z-10 max-w-8xl">
  //       <div className="flex items-center justify-between gap-6">
  //         <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
  //           <Link
  //             href="/"
  //             className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
  //           >
  //           {data.icon.name ?
  //             <Icon
  //               tinaField={tinaField(data, "icon")}
  //               parentColor={data.color}
  //               data={{
  //                 name: data.icon.name,
  //                 color: data.icon.color,
  //                 style: data.icon.style,
  //               }}
  //             /> :
  //             <Image
  //                 src={data.icon.image ? data.icon.image : ""}
  //                 width={80}
  //                 height={80}
  //                 data-tina-field={tinaField(data.icon, 'image')} alt={""} />
  //           }
  //         </Link>
  //         </h4>
  //         <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
  //           {data.nav &&
  //             data.nav.map((item, i) => {
  //               const activeItem =
  //                 (item.href === ""
  //                   ? router.asPath === "/"
  //                   : router.asPath.includes(item.href)) && isClient;
  //               return (
  //                 <li
  //                   key={`${item.label}-${i}`}
  //                 >
  //                   <Link
  //                     data-tina-field={tinaField(item, "label")}
  //                     href={`/${item.href}`}
  //                     className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
  //                       activeItem ? `text-[#8f6e5d]` : ``
  //                     }`}
  //                   >
  //                     {item.label}
  //                     {activeItem && (
  //                       <svg
  //                         className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15`}
  //                         preserveAspectRatio="none"
  //                         viewBox="0 0 230 230"
  //                         fill="none"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <rect
  //                           x="230"
  //                           y="230"
  //                           width="230"
  //                           height="230"
  //                           transform="rotate(-180 230 230)"
  //                           fill="url(#paint0_radial_1_33)"
  //                         />
  //                         <defs>
  //                           <radialGradient
  //                             id="paint0_radial_1_33"
  //                             cx="0"
  //                             cy="0"
  //                             r="1"
  //                             gradientUnits="userSpaceOnUse"
  //                             gradientTransform="translate(345 230) rotate(90) scale(230 115)"
  //                           >
  //                             <stop stopColor="currentColor" />
  //                             <stop
  //                               offset="1"
  //                               stopColor="currentColor"
  //                               stopOpacity="0"
  //                             />
  //                           </radialGradient>
  //                         </defs>
  //                       </svg>
  //                     )}
  //                   </Link>
  //                 </li>
  //               );
  //             })}
  //         </ul>
  //       </div>
  //       <div
  //         className={`absolute h-1 bg-gradient-to-r from-transparent ${
  //           data.color === "primary" ? `via-white` : `via-black dark:via-white`
  //         } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
  //       />
  //     </Container>
  //   </div>
  // );
};
