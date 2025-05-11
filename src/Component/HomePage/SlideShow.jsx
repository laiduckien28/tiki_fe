import React from 'react';
import { Col, Row } from 'antd';
import Slider from 'react-slick'; // Thư viện chính
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { id: 1, url: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/af/45/62/f95333137ee17e00fa4f3612042434b8.jpg.webp" },
  { id: 2, url: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/fb/52/9d/9cfb34aa0eb51687641dede7ec46a54a.jpg.webp" },
  { id: 3, url: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/e1/07/59/69377991347b5729fe5cd681cf15e16f.png.webp" },
  { id: 4, url: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/56/80/88/32abe2e9050b774f3d4101feef22af4b.jpg.webp" }
];

const SlideShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="my-5">
<div className="block sm:hidden py-2 "> 
      <Row>
        <Col span={1}></Col>

        <Col span={21}>
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image.id} className="px-2 box-border rounded-sm">
                <img
                  src={image.url}
                  alt={`slide-${image.id}`}
                />
              </div>
            ))}
          </Slider>
        </Col>
        <Col span={2}></Col>
      </Row>
</div>

<div className="hidden sm:block py-2 "> 

      <Row>
        <Col span={2}></Col>
        <Col span={4}></Col>

        <Col span={16}>
          <Slider {...settings}>
            {images.map((image) => (
              <div key={image.id} className="px-2 box-border rounded-sm">
                <img
                  src={image.url}
                  alt={`slide-${image.id}`}
                />
              </div>
            ))}
          </Slider>
        </Col>
        <Col span={2}></Col>
      </Row>
</div>


    </div>
  );
};

export default SlideShow;
