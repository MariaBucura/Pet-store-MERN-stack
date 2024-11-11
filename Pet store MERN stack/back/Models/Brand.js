import mongoose from 'mongoose';
import { orderSchema } from './Order.js';
import { productSchema } from './Product.js';

const brandSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: String,
        },
        isFeatured: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
);

export const Brand = mongoose.model('Brand', brandSchema);