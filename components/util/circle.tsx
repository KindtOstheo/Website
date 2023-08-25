import React from "react";

export const Circle = ({
    className,
    width,
    height,
    fill = true,
    ...props
}) => {
  return (
    <div
      className={`absolute ${className} ${
        fill ? "bg-primary" : "bg-[#ffe6db]"
      } rounded-full`}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...props}
    ></div>
  );
};