import { useEffect, useState } from 'react'
import './AddProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCaretLeft, faX } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddProducts = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownClosing, setIsDropdownClosing] = useState(false);
    const [isButtonDown, setIsButtonDown] = useState(false);
    const [isSubButtonDown, setIsSubButtonDown] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const [isSubDropdownClosing, setIsSubDropdownClosing] = useState(false);
    const [isCategoryButtonDown, setIsCategoryButtonDown] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isCategoryDropdownClosing, setIsCategoryDropdownClosing] = useState(false);
    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
    const [isBrandDropdownClosing, setIsBrandDropdownClosing] = useState(false);
    const [isBrandButtonDown, setIsBrandButtonDown] = useState(false);
    const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false);
    const [isSubCategoryDropdownClosing, setIsSubCategoryDropdownClosing] = useState(false);
    const [isSubCategoryButtonDown, setIsSubCategoryButtonDown] = useState(false);
    const [search, setSearch] = useState('');
    const [subSearch, setSubSearch] = useState('');
    const [subCategorySearch, setSubCategorySearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const petCategories = [
        "Dogs",
        "Cats",
        "Fish",
        "Small pets",
        "Birds",
        "Reptiles",
        "Farm animals"
    ]

    const categories = [
        "Food",
        "Supplies"
    ]

    const fishCategories = [
        "Marine & Freshwater",
        "Betta",
        "Goldfish",
        "Cichlid",
        "Shrimp",
        "Koi & Pond"
    ]

    const birdCategories = [
        "Parakeet",
        "Conure",
        "Parrot",
        "Cockatiel",
        "Lovebird",
        "Wild Bird",
        "Finch & Canary",
        "Chicken & Poultry"
    ]

    const reptileCategories = [
        "Bearded Dragon",
        "Gecko & Lizard",
        "Snake",
        "Frog",
        "Turtle",
        "Hermit Crab",
        "Chameleon"
    ]

    const smallPetCategories = [
        "Hamster & Gerbil",
        "Guinea Pig",
        "Rabbit",
        "Ferret",
        "Chinchilla",
        "Rat & Mouse",
        "Hedgehog & Sugar Glider"
    ]

    const farmAnimalCategories = [
        "Chicken & Poultry",
        "Cow",
        "Duck",
        "Goat",
        "Horse",
        "Pig",
        "Sheep"
    ]

    const dogFood = [
        "Dry food",
        "Wet food",
        "Puppy food",
        "Fresh & Frozen",
        "Food Toppers",
        "Treats"
    ]

    const catFood = [
        "Wet food",
        "Dry food",
        "Kitten food",
        "Cat treats",
        "Food toppers",
        "Treats"
    ]

    const dogSupplies = [
        "Collars, Harnesses & Leashes",
        "Toys",
        "Crates, Gates & Containment",
        "Crates & Kennels",
        "Beds & Furniture",
        "Clothing & Shoes",
        "Bowls & Feeders",
        "Grooming supplies",
        "Health & Wellness",
        "Flea & Tick",
        "Cleaning supplies",
        "Vitamins & Supplements",
        "Training & Behaviour",
        "Puppy supplies"
    ]

    const catSupplies = [
        "Toys",
        "Bed & Furniture",
        "Crates, Gates & Containment",
        "Bowls & Feeders",
        "Collars, Harnesses & Leashes",
        "Clothing & Accessories",
        "Health & Wellness",
        "Flea & Tick",
        "Grooming supplies",
        "Vitamins & Supplements",
        "Cleaning & Repellents",
        "Kitten supplies"
    ]

    const fishSupplies = [
        "Aquariums & Tanks",
        "Stands",
        "Feeders",
        "Water care & Conditioner",
        "Salt Water care",
        "Pond care",
        "Water quality testers",
        "Disease treatment",
        "Decor, Gravel & Substrate",
        "Ornaments",
        "Gravel, Sand & Stones",
        "Live plants",
        "Artificial plants",
        "Substrate",
        "Filter & Pumps",
        "Filters",
        "Filter Media",
        "Heating & Lighting",
        "Maintenance & Repair"
    ]

    const birdSupplies = [
        "Cages",
        "Stands",
        "Toys, Perches & Decor",
        "Chews",
        "Swings",
        "Litter & Nesting",
        "Vitamins & Supplements",
        "Grooming",
        "Cleaning & Odor control"
    ]

    const reptileSupplies = [
        "Feeders",
        "Cleaning & Water care",
        "Vitamins & Supplemennts",
        "Terrariums",
        "Stands",
        "Heating & Lighting",
        "Bulbs & Lamps",
        "Substrate & Bedding",
        "Habitat decor",
        "Food & Water bowls",
    ]

    const smallPetSupplies = [
        "Habitats",
        "Habitat epansions",
        "Hutches",
        "Stands",
        "Hay",
        "Litter & Bedding",
        "Habitat accessories",
        "Toy & Chews",
        "Tunnels & Hideouts",
        "Feeders & Water bowls",
        "Health & Grooming",
        "Cleaning & Odor removal"
    ]

    const [brands, setBrands] = useState([]);
    const [brandsError, setBrandsError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:8080/brand/all");
                const brandNames = response.data.map((brand) => brand.name);
                setBrands(brandNames);
                console.log(brands);

            } catch (err) {
                console.error("Error fetching brands:", err);
                setBrandsError("Failed to fetch brands");
            }
            finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    const [filteredPets, setFilteredPets] = useState(petCategories);
    const [filteredFish, setFilteredFish] = useState(fishCategories);
    const [filteredSmall, setFilteredSmall] = useState(smallPetCategories);
    const [filteredBirds, setFilteredBirds] = useState(birdCategories);
    const [filteredReptiles, setFilteredReptiles] = useState(reptileCategories);
    const [filteredFarm, setFilteredFarm] = useState(farmAnimalCategories);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filteredDogFood, setFilteredDogFood] = useState(dogFood);
    const [filteredDogSupplies, setFilteredDogSupplies] = useState(dogSupplies);
    const [filteredCatFood, setFilteredCatFood] = useState(catFood);
    const [filteredCatSupplies, setFilteredCatSupplies] = useState(catSupplies);
    const [filteredFishSupplies, setFilteredFishSupplies] = useState(fishSupplies);
    const [filteredBirdSupplies, setFilteredBirdSupplies] = useState(birdSupplies);
    const [filteredReptileSupplies, setFilteredReptileSupplies] = useState(reptileSupplies);
    const [filteredSmallPetSupplies, setFilteredSmallPetSupplies] = useState(smallPetSupplies);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    useEffect(() => {
        setFilteredBrands(brands);
    }, [brands]);

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImages = (event) => {
        
        const imagePrev = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
        setImagePreview((images) => [...images, ...imagePrev]);
        setSelectedImages((images) => [...images, ...Array.from(event.target.files)]);
    };

    const toggleDropdown = (dropdownOpen, buttonDown, setDropdownClosing, setButtonDown, setDropdownOpen) => {
        if (dropdownOpen) {
            setDropdownClosing(true);
            setButtonDown(!buttonDown);
            setTimeout(() => {
                setDropdownOpen(!dropdownOpen);
                setDropdownClosing(false);
            }, 490);
        } else {
            setDropdownOpen(!dropdownOpen);
            setButtonDown(!buttonDown);
        }
    }

    const handleInputChange = (event, list, setList, setSearchValue, setDropdownOpen, setButtonDown) => {
        const input = event.target.value;
        setSearchValue(input);
        setList(list);

        if (input.trim() === '') {
            setList(list);
        } else {
            const filtered = list.filter((category) =>
                category.toLowerCase().includes(input.toLowerCase())
            );
            setList(filtered);
            setDropdownOpen(true);
            setButtonDown(true);
        }
    };


    const handleInputClick = (category, setSearchValue, setDropdownOpen, setButtonDown) => {
        setSearchValue(category);
        setDropdownOpen(false);
        setButtonDown(false);
    }

    const handleSelectCategories = (category, setDropdownOpen, setButtonDown) => {
        setSelectedCategories((prevCategories) => [...prevCategories, category]);
        setDropdownOpen(false);
        setButtonDown(false);
    }

    const handleRemoveCategory = (category) => {
        setSelectedCategories((prevCategories) => prevCategories.filter((item) => item != category));
    }

    useEffect(() => {
        setSubSearch('');
    }, [search]);

    useEffect(() => {
        setSubCategorySearch('');
    }, [search, categorySearch]);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [error, setError] = useState();

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("petcategory", search);
        formData.append("subpetcategory", subSearch);
        formData.append("category", categorySearch);
        formData.append("subcategory", subCategorySearch);
        formData.append("brand", brandSearch);
        formData.append("price", price);
        formData.append("description", description);
        selectedImages.forEach((file) => formData.append("images", file));

        try{
            const response = await axios.post("http://localhost:8080/product/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.href = '/';
        }catch(err){
            setError("Failed to add product");
            console.log(error);
        }
    }


    return (
        <form className="add-products-area" onSubmit={handleAddProduct}>
            { error ?
            <p>{error}</p>
            :
            <div></div>
            }
            <h1 className="add-header">
                Add a product
            </h1>
            <div className="add-text">
                Product name
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="add-input" placeholder='Product name' />
            <div className="select-pet">
                <div className="add-text">
                    Choose pet
                </div>
                <div className="add-input-container">
                    <input type="text" value={search} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, petCategories, setFilteredPets, setSearch, setIsDropdownOpen, setIsButtonDown)} />
                    <div className={`input-drop-button ${isButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isDropdownOpen, isButtonDown, setIsDropdownClosing, setIsButtonDown, setIsDropdownOpen)}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    {isDropdownOpen && filteredPets.length > 0 ?
                        <div className={`pet-category-dropdown ${isDropdownClosing ? 'closing' : ''}`}>
                            {filteredPets.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleInputClick(item, setSearch, setIsDropdownOpen, setIsButtonDown)}
                                    className="select-drop-button">
                                    {item}
                                </div>
                            ))}
                        </div>
                        :
                        <div></div>}
                </div>
            </div>

            {search == "Fish" && (
                <div className="sub-category-container">
                    <div className="add-text">
                        Choose Fish Type
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, fishCategories, setFilteredFish, setSubSearch, setIsSubDropdownOpen, setIsSubButtonDown)} />
                        <div className={`input-drop-button ${isSubButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubDropdownOpen, isSubButtonDown, setIsSubDropdownClosing, setIsSubButtonDown, setIsSubDropdownOpen)} >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubDropdownOpen && filteredFish.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubDropdownClosing ? 'closing' : ''}`}>
                                {filteredFish.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select-drop-button"
                                        onClick={() => handleSelectCategories(item, setIsSubDropdownOpen, setIsSubButtonDown)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                    <div className="selected-pets-area">
                        {selectedCategories.map((item, index) => (
                            <div 
                            className="selected-pet-item"
                            key={index}>
                                {item}
                                <div className="delete-category-button" onClick={() => handleRemoveCategory(item)}>
                                <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {search == "Small pets" && (
                <div className="sub-category-container">
                    <div className="add-text">
                        Choose Small pet
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, smallPetCategories, setFilteredSmall, setSubSearch, setIsSubDropdownOpen, setIsSubButtonDown)} />
                        <div className={`input-drop-button ${isSubButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubDropdownOpen, isSubButtonDown, setIsSubDropdownClosing, setIsSubButtonDown, setIsSubDropdownOpen)} >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubDropdownOpen && filteredSmall.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubDropdownClosing ? 'closing' : ''}`}>
                                {filteredSmall.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select-drop-button"
                                        onClick={() => handleSelectCategories(item, setIsSubDropdownOpen, setIsSubButtonDown)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                    <div className="selected-pets-area">
                        {selectedCategories.map((item, index) => (
                            <div 
                            className="selected-pet-item"
                            key={index}>
                                {item}
                                <div className="delete-category-button" onClick={() => handleRemoveCategory(item)}>
                                <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {search == "Birds" && (
                <div className="sub-category-container">
                    <div className="add-text">
                        Choose Bird
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, birdCategories, setFilteredBirds, setSubSearch, setIsSubDropdownOpen, setIsSubButtonDown)} />
                        <div className={`input-drop-button ${isSubButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubDropdownOpen, isSubButtonDown, setIsSubDropdownClosing, setIsSubButtonDown, setIsSubDropdownOpen)} >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubDropdownOpen && filteredBirds.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubDropdownClosing ? 'closing' : ''}`}>
                                {filteredBirds.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select-drop-button"
                                        onClick={() => handleSelectCategories(item, setIsSubDropdownOpen, setIsSubButtonDown)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                    <div className="selected-pets-area">
                        {selectedCategories.map((item, index) => (
                            <div 
                            className="selected-pet-item"
                            key={index}>
                                {item}
                                <div className="delete-category-button" onClick={() => handleRemoveCategory(item)}>
                                <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {search == "Reptiles" && (
                <div className="sub-category-container">
                    <div className="add-text">
                        Choose Reptile
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, reptileCategories, setFilteredReptiles, setSubSearch, setIsSubDropdownOpen, setIsSubButtonDown)} />
                        <div className={`input-drop-button ${isSubButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubDropdownOpen, isSubButtonDown, setIsSubDropdownClosing, setIsSubButtonDown, setIsSubDropdownOpen)} >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubDropdownOpen && filteredReptiles.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubDropdownClosing ? 'closing' : ''}`}>
                                {filteredReptiles.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select-drop-button"
                                        onClick={() => handleSelectCategories(item, setIsSubDropdownOpen, setIsSubButtonDown)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                    <div className="selected-pets-area">
                        {selectedCategories.map((item, index) => (
                            <div 
                            className="selected-pet-item"
                            key={index}>
                                {item}
                                <div className="delete-category-button" onClick={() => handleRemoveCategory(item)}>
                                <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {search == "Farm animals" && (
                <div className="sub-category-container">
                    <div className="add-text">
                        Choose Farm animal
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, farmAnimalCategories, setFilteredFarm, setSubSearch, setIsSubDropdownOpen, setIsSubButtonDown)} />
                        <div className={`input-drop-button ${isSubButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubDropdownOpen, isSubButtonDown, setIsSubDropdownClosing, setIsSubButtonDown, setIsSubDropdownOpen)} >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubDropdownOpen && filteredFarm.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubDropdownClosing ? 'closing' : ''}`}>
                                {filteredFarm.map((item, index) => (
                                    <div
                                        key={index}
                                        className="select-drop-button"
                                        onClick={() => handleSelectCategories(item, setIsSubDropdownOpen, setIsSubButtonDown)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                    <div className="selected-pets-area">
                        {selectedCategories.map((item, index) => (
                            <div 
                            className="selected-pet-item"
                            key={index}>
                                {item}
                                <div className="delete-category-button" onClick={() => handleRemoveCategory(item)}>
                                <FontAwesomeIcon icon={faX} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="select-category">
                <div className="add-text">
                    Choose Category
                </div>
                <div className="add-input-container">
                    <input type="text" value={categorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, categories, setFilteredCategories, setCategorySearch, setIsCategoryDropdownOpen, setIsCategoryButtonDown)} />
                    <div className={`input-drop-button ${isCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isCategoryDropdownOpen, isCategoryButtonDown, setIsCategoryDropdownClosing, setIsCategoryButtonDown, setIsCategoryDropdownOpen)}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    {isCategoryDropdownOpen && filteredCategories.length > 0 ?
                        <div className={`pet-category-dropdown ${isCategoryDropdownClosing ? 'closing' : ''}`}>
                            {filteredCategories.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleInputClick(item, setCategorySearch, setIsCategoryDropdownOpen, setIsCategoryButtonDown)}
                                    className="select-drop-button">
                                    {item}
                                </div>
                            ))}
                        </div>
                        :
                        <div></div>}
                </div>
            </div>

            {search == "Dogs" && categorySearch == "Food" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Dog Food
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, dogFood, setFilteredDogFood, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredDogFood.length > 0 ?
                            <div className={`pet-category-dropdown ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredDogFood.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Dogs" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Dog Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, dogSupplies, setFilteredDogSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredDogSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredDogSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Cats" && categorySearch == "Food" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Cat Food
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, catFood, setFilteredCatFood, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredCatFood.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredCatFood.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Cats" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Cat Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, catSupplies, setFilteredCatSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredCatSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredCatSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Fish" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Fish Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, fishSupplies, setFilteredFishSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredFishSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredFishSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Birds" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Bird Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, birdSupplies, setFilteredBirdSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredBirdSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredBirdSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Reptiles" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Reptiles Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, reptileSupplies, setFilteredReptileSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredReptileSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredReptileSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            {search == "Small pets" && categorySearch == "Supplies" && (
                <div className="select-sub-food">
                    <div className="add-text">
                        Choose Small Pet Supplies
                    </div>
                    <div className="add-input-container">
                        <input type="text" value={subCategorySearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, smallPetSupplies, setFilteredSmallPetSupplies, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)} />
                        <div className={`input-drop-button ${isSubCategoryButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isSubCategoryDropdownOpen, isSubCategoryButtonDown, setIsSubCategoryDropdownClosing, setIsSubCategoryButtonDown, setIsSubCategoryDropdownOpen)}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </div>
                        {isSubCategoryDropdownOpen && filteredSmallPetSupplies.length > 0 ?
                            <div className={`pet-category-dropdown sub-category ${isSubCategoryDropdownClosing ? 'closing' : ''}`}>
                                {filteredSmallPetSupplies.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setSubCategorySearch, setIsSubCategoryDropdownOpen, setIsSubCategoryButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            :
                            <div></div>}
                    </div>
                </div>
            )}

            <div className="select-brand">
                <div className="add-text">
                    Choose Brand
                </div>
                <div className="add-input-container">
                    <input type="text" value={brandSearch} className="add-input-dropdown" placeholder='Choose category' onChange={(e) => handleInputChange(e, brands, setFilteredBrands, setBrandSearch, setIsBrandDropdownOpen, setIsBrandButtonDown)} />
                    <div className={`input-drop-button ${isBrandButtonDown ? 'open' : 'close'}`} onClick={() => toggleDropdown(isBrandDropdownOpen, isBrandButtonDown, setIsBrandDropdownClosing, setIsBrandButtonDown, setIsBrandDropdownOpen)}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </div>
                    {isBrandDropdownOpen && filteredBrands.length > 0 ?
                        <div className={`pet-category-dropdown ${isBrandDropdownClosing ? 'closing' : ''}`}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                filteredBrands.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleInputClick(item, setBrandSearch, setIsBrandDropdownOpen, setIsBrandButtonDown)}
                                        className="select-drop-button">
                                        {item}
                                    </div>
                                ))
                            )}
                        </div>
                        :
                        <div></div>}
                </div>
            </div>


            <div className="add-text">
                Product price
            </div>
            <div className="price-input">
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="add-input" placeholder='Price' style={{ width: '200px' }} />
                <div className="currency-container">
                    <FontAwesomeIcon icon={faDollarSign} />
                </div>
            </div>
            <div className="add-text">
                Product description
            </div>
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="add-input add-description" placeholder='Product description' />
            <div className="add-text">Add product images</div>
            <input type="file" className="image-input" multiple onChange={handleImages} />
            <div className="selected-images">
                <div className="selected-images-container">
                    {imagePreview.length > 0 ?
                        imagePreview.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Selected Preview ${index + 1}`}
                                className='image-added'
                            />
                        )) : (
                            <p></p>)
                    }
                </div>
            </div>
            <button type='submit' className="submit-product">Add product</button>
        </form>
    )
}

export default AddProducts