import mongoose from 'mongoose';
import { Product, productSchema } from './Product.js';

export const orderSchema = mongoose.Schema(
    {
        products: [productSchema]
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model('Order', orderSchema);