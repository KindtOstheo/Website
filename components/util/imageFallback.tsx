import Image from "next/image";
import { useEffect, useState } from "react";

export const ImageFallback = ({className, src, width, height, priority, alt, }) => {
    const fallback = src;
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
      }, [src]);

  return (
    <Image
      className= {className}
      src={imgSrc}
      width={width}
      height={height}
      priority={priority}
      alt={alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};