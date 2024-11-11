import mongoose from 'mongoose';

export const productSchema = mongoose.Schema(
    {
        name: {
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
        pet: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);