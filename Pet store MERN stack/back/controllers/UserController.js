import { User } from "../Models/User.js";

export async function getUser(request, response){
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
}

export async function updateName(request, response){
    const {firstName, lastName} = request.body;

    try{
        const userToUpdate = await User.findById(request.params.id);
        if(firstName){
            userToUpdate.firstName = firstName;
        }
        if(lastName){
            userToUpdate.lastName = lastName;
        }
        await userToUpdate.save();
        response.status(201).json({message: 'Account updated successfully!'});
    }catch(err){
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function updateCity(request, response){
    const {city} = request.body;

    try{
        const userToUpdate = await User.findById(request.params.id);
        userToUpdate.city = city;
        await userToUpdate.save();
        response.status(201).json({message: 'Account updated successfully!'});
    }catch(err){
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function updateAddress(request, response){
    const {address} = request.body;

    try{
        const userToUpdate = await User.findById(request.params.id);
        userToUpdate.shippingAddress = address;
        await userToUpdate.save();
        response.status(201).json({message: 'Account updated successfully!'});
    }catch(err){
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function updatePhoneNumber(request, response){
    const {phoneNumber} = request.body;

    try{
        const userToUpdate = await User.findById(request.params.id);
        userToUpdate.phoneNumber = phoneNumber;
        await userToUpdate.save();
        response.status(201).json({message: 'Account updated successfully!'});
    }catch(err){
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function deleteUser(request, response){
    try{
        await User.findByIdAndDelete(request.params.id);
        response.status(201).json({message: 'User deleted successfully'});
    }catch(err){
        response.status(500).json({error: 'Internal server error'});
    }
}