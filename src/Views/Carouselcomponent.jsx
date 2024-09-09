import { Carousel } from "@mantine/carousel";
import { Image } from '@mantine/core';



const images = [
    'src/assets/Images/Image1.jpg',
    'src/assets/Images/Image2.jpg',
    'src/assets/Images/Image3.jpg',
    'src/assets/Images/Image4.jpg',
    'src/assets/Images/Image5.jpg',
    'src/assets/Images/Image6.jpg'
];



function Carouselcomponent() {

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} style={{ height: '500px', objectFit: 'cover' }} className="img-fluid w-100" />
        </Carousel.Slide>
    ));

    return (
        <div className="container-fluid">
            <Carousel withIndicators>{slides}</Carousel>
        </div>
    )




}

export default Carouselcomponent;