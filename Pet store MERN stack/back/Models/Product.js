import mongoose from 'mongoose';
import { reviewSchema } from './Review.js';

export const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        petCategory: {
            type: String,
            required: true
        },
        petSubCategory: {
            type: [String]
        },
        category: {
            type: String,
            required: true
        },
        subCategory: {
            type: String
        },
        images: {
            type: [String]
        },
        reviews: {
            type: [reviewSchema]
        }
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);