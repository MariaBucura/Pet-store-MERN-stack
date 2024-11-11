import Navbar from "../components/Navbar/Navbar"
import Slider from "../components/Slider/Slider"
import Footer from "../components/Footer/Footer"
import PetSlider from "../components/Pet Slider/PetSlider"
import Categories from "../components/Categories/Categories"
import FeaturedBrands from "../components/Featured Brands/FeaturedBrands"

const Home = () => {
    return(
        <div>
            <Navbar></Navbar>
            <Slider></Slider>
            <PetSlider></PetSlider>
            <Categories></Categories>
            <FeaturedBrands></FeaturedBrands>
            <Footer></Footer>
        </div>
    )
}

export default Home