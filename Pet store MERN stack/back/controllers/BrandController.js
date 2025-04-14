import {Brand} from "../Models/Brand.js";

export async function addBrand(request, response){
    const {name, description} = request.body;
    const image = request.file;

    if(!name || !image || !description){
        return response.status(400).json({error: "All fields are required"});
    }

    try{
        const newBrand = new Brand();
        newBrand.name = name;
        newBrand.description = description;

        const imageUrl = `${request.protocol}://${request.get("host")}/uploads/${image.filename}`;
        newBrand.logo = imageUrl;

        await newBrand.save();
        response.status(201).json({message: "Brand added successfully!"});
    }catch(err){
        response.status(500).json({error: "Internal server error"});
    }
}

export async function getBrands(request, response){
    try{
        const brands = await Brand.find();
        response.status(200).json(brands);
    }catch(err){
        response.status(500).json({error: "Failed to fetch brands"});
    }
}