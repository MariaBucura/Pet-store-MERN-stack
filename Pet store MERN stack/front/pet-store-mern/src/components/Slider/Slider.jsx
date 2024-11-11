import './Slider.css'
import banner1 from '../../images/banner 1.jpg'
import banner2 from '../../images/banner 2.jpg'
import banner3 from '../../images/banner 3.jpg'
import { useEffect, useState } from 'react'

const Slider = () => {

    const [Images, setImages] = useState([
        banner1,
        banner2,
        banner3
    ]);

    const [clickKey, setClickKey] = useState();

    const handleClick = (nr) => {
        setClickKey(nr);
    }

    const sliderStyles = [
        {transform: 'translateX(0%)'},
        {transform: 'translateX(-100%)'},
        {transform: 'translateX(-200%)'}

    ];

    const [index, setIndex] = useState(0);

    const length = Images.length;

    const dots = Array.from({length}, (_, index) => index + 1);

    useEffect(() => {
        const interval = setInterval(() =>{
            setIndex((prevIndex) => (prevIndex + 1) % sliderStyles.length);
    }, 4000);

    return () => clearInterval(interval);
}, [sliderStyles.length]);

    return(
        <div className="slider-container">
            {Images.map((image) => (
                    <div className="main-slider" style = {{
                        
                        ...sliderStyles[index]
                        //...(clickKey != 0 ? sliderStyles[clickKey - 1] : sliderStyles[index])
                    }}> 
                        <img src={image} alt="" className="slider-image" />
                    </div>
                ))}
            <div className="main-dots">
                {dots.map((nr) => (
                    <div className="slider-dot" onClick={() => handleClick(nr)} key = {nr} style = {{backgroundColor: index + 1 === nr ? '#ba72da' : 'lightblue' }}></div>
                ))}
            </div>
        </div>
    )
}

export default Slider