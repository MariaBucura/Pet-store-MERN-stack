import mongoose from 'mongoose';

export const reviewSchema = mongoose.Schema(
    {
        userID: {
            type: String
        },
        content: {
            type: String
        },
        rating: {
            type: Number
        },
        pictures: [String],
    },
    {
        timestamps: true
    }
);

export const Review = mongoose.model('Review', reviewSchema);