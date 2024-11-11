import mongoose from 'mongoose';
import { orderSchema } from './Order.js';
import { productSchema } from './Product.js';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        shippingAddress: {
            type: String
        },
        city: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        orders: [orderSchema],
        wishlist: [productSchema],
        role: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);