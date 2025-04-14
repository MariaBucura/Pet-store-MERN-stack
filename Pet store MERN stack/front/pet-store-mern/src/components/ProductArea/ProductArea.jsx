import "./ProductArea.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { useState } from "react";


const ProductArea = () => {

    const [quantity, setQuantity] = useState(0);

    return (
        <div className="product-area">
            <div className="product-images-container">
                <div className="favorite-button">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <img src="https://media.zooplus.com/bilder/3/800/71629_pla_whiskas_1plus_huhn_7kg_hs_01_3.jpg" alt="" className="product-image" />
            </div>
            <div className="product-general">
                <div className="product-title">
                    A Very Good Title
                </div>
                <div className="product-brand">
                    Goated Brand
                </div>
                <div className="product-review-area">
                    <div className="product-rating">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="review-count">
                        69 reviews
                    </div>
                </div>
                <div className="product-price">
                    $420.69
                </div>
            </div>
            <div className="product-shipping-options">
                <div className="product-brand">
                    In stock
                </div>
                <div className="quantity-area">
                    <input type="text" className="quantity-input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <div className="quantity-buttons">
                        <div className="inc-button">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductArea