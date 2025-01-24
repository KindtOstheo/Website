import SwiperInstance from "swiper";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (

    <div className="swiper-button-prev" onClick={() => swiperRef.current?.slidePrev()}></div>
  );
};

export default NextButton;