import './PetSlider.css'
import dog from '../../images/Untitled54.png'
import cat from '../../images/Untitled55.png'
import fish from '../../images/Untitled56.png'
import bird from '../../images/Untitled57.png'
import reptile from '../../images/Untitled58.png'
import smallPet from '../../images/Untitled59.png'
import farmPet from '../../images/Untitled60.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

const PetSlider = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [moveValue, setMoveValue] = useState(220);

    const [transformPosition, setTransformPosition] = useState(0);

    const [index, setIndex] = useState(1);

    const [minSlideValue, setMinSlideValue] = useState(-440);
    const [maxSlideValue, setMaxSlideValue] = useState(660);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const setMinMax = () => {
        switch(true){
            case windowWidth < 1220 && windowWidth > 900:
                setMinSlideValue(-880);
                setMaxSlideValue(1100);
                break;
            case windowWidth < 900:
                setMinSlideValue(-1320);
                setMaxSlideValue(1540);
                break;
            default:
                setMinSlideValue(-440);
                setMaxSlideValue(660);
        }
    }

    const resetValue = () => {
        if(windowWidth >= 900){
            setTransformPosition(0);
            setIndex(1);
        }
    }

    window.addEventListener("resize", resetValue);

    const handleClickRight = () => {
        setMinMax();
        console.log(transformPosition);
            console.log(index);
        if (index < 7 && transformPosition > minSlideValue){
            setIndex(index + 1);
            setTransformPosition(transformPosition - moveValue);
        }
    }

    const handleClickLeft = () => {
        setMinMax();
        console.log(transformPosition);
            console.log(index);
        if (index > 1 && transformPosition < maxSlideValue){
            setIndex(index - 1);
            setTransformPosition(transformPosition + moveValue);
        }
    }

    return (
        <div className="pet-slider">
            {windowWidth < 1220 && windowWidth > 900 ? (
            <div className="pet-slider-contents">
            <h1 className="pet-header">
                Shop by pet
            </h1>
            <div className="pet-slider-area">
                <div className="slide-left" onClick={handleClickLeft}>
                <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            <div className="pet-slider-container-responsive">
            <div className="slider-links" style={{transform: `translateX(${transformPosition}px)`}}>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={dog} alt="dog" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Dog
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={cat} alt="cat" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Cat
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={fish} alt="fish" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Fish
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={bird} alt="bird" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Bird
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={reptile} alt="reptile" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Reptile
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={smallPet} alt="small pet" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Small Pet
                    </p>
                </div>
                <div className="slider-item">
                    <div className="pet-slider-image">
                        <img src={farmPet} alt="farm pet" className="pet-image" />
                    </div>
                    <p className="slider-label">
                        Farm & backyard pet
                    </p>
                </div>
            </div>
            </div>
            <div className="slide-right" onClick={handleClickRight}>
                <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div> )
        
        : windowWidth < 900 ? (
            <div className="pet-slider-contents">
                <h1 className="pet-header">
                    Shop by pet
                </h1>
                <div className="pet-slider-area">
                    <div className="slide-left" onClick={handleClickLeft}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                <div className="pet-slider-container-mobile">
                <div className="slider-links" style={{transform: `translateX(${transformPosition}px)`}}>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={dog} alt="dog" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Dog
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={cat} alt="cat" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Cat
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={fish} alt="fish" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Fish
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={bird} alt="bird" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Bird
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={reptile} alt="reptile" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Reptile
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={smallPet} alt="small pet" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Small Pet
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={farmPet} alt="farm pet" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Farm & backyard pet
                        </p>
                    </div>
                </div>
                </div>
                <div className="slide-right" onClick={handleClickRight}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        ) : (
            <div className="pet-slider-contents">
                <h1 className="pet-header">
                    Shop by pet
                </h1>
                <div className="pet-slider-area">
                    <div className="slide-left" onClick={handleClickLeft}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                <div className="pet-slider-container">
                <div className="slider-links" style={{transform: `translateX(${transformPosition}px)`}}>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={dog} alt="dog" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Dog
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={cat} alt="cat" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Cat
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={fish} alt="fish" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Fish
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={bird} alt="bird" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Bird
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={reptile} alt="reptile" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Reptile
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={smallPet} alt="small pet" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Small Pet
                        </p>
                    </div>
                    <div className="slider-item">
                        <div className="pet-slider-image">
                            <img src={farmPet} alt="farm pet" className="pet-image" />
                        </div>
                        <p className="slider-label">
                            Farm & backyard pet
                        </p>
                    </div>
                </div>
                </div>
                <div className="slide-right" onClick={handleClickRight}>
                    <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default PetSlider