import SwiperInstance from "swiper";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <div className="swiper-button-next" onClick={() => swiperRef.current?.slideNext()}></div>
    
  );
};

export default NextButton;