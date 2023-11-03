import React from "react";
import type { TinaMarkdownContent, Components } from "tinacms/dist/rich-text";


export const components: Components<{
    Listing: {
        type: string;
        font: string;
        list: {txt:string}[];
      };
      Space: {
        height: number;
      };
}> = {
    Listing: (props) => (
        <div className={`${props.font}`}>
        <ol style={{listStyle:props.type}}>
            {props.list &&
            props.list.map((item,i)=> {
            return (
                <li key={`${i}`}>
                {item.txt}
                </li>
            )
            })}
        </ol>
        </div>
    ),
    Space: (props) => (
        <div style={{height: props.height+'px'}} className={`h-[${props.height}px]`}></div>
      ),
};