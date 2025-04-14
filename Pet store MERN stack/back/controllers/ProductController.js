import { Product } from "../Models/Product.js";

export async function addProduct(request, response){
    const {name, petcategory, subpetcategory, category, subcategory, brand, price, description} = request.body;
    const images = request.files;

    if(!name || !petcategory || !category || !price || !description){
        return response.status(400).json({error: "Please fill the required fields!"});
    }

    try{
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.brand = brand;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.petCategory = petcategory;
        newProduct.petSubCategory = subpetcategory;
        newProduct.category = category;
        newProduct.subCategory = subcategory;
        newProduct.images = images.map(file => `${request.protocol}://${request.get("host")}/uploads/${file.filename}`);
        await newProduct.save();
        response.status(201).json({message: "product added successfully!"});
    }catch(err){
        response.status(500).json({error: "Internal server error"});
    }
}