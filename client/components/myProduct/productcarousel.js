import { useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

// 根据产品图片命名规则生成图片数组
const getProductImages = (imageName) => {
  // 提取基础名称
  const baseName = imageName.split('-')[0];
  const images = [];
  for (let i = 1; i <= 4; i++) {
    // 假设您最多有4张图片
    images.push(`/images/myProduct/${baseName}-${i}.jpg`);
  }
  return images;
};

export default function Carousel({ products }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // 使用 useMemo 缓存所有产品的图片数组
  const allProductImages = useMemo(() => {
    return products.map((product) => getProductImages(product.image)).flat();
  }, [products]);

  // 过滤只包含当前产品图片的数组
  const currentProductImages = allProductImages.filter((image) =>
    image.includes(products[0].image.split('-')[0])
  );

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Swiper
          style={{
            '--swiper-navigation-color': 'gray',
            '--swiper-pagination-color': '#fff',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {currentProductImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {currentProductImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
