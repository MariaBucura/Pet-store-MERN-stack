import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(request, response){
    const {email, password} = request.body;

    if (!email || !password){
        return response.status(400).json({error: 'All fields are required'});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return response.status(400).json({error: 'Account associated with this email already exists!'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const newUser = new User();

        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.role = 'customer';

        await newUser.save();
        response.status(201).json({message: 'Account created successfully!'});
    }catch(err){
        console.error(err);
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function loginUser(request, response){
    const {email, password} = request.body;

    if(!email || !password){
        return response.status(400).json({error: 'All fields are required'});
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return response.status(400).json({error: 'Account not found'});
        }

        const hashPassword = await bcrypt.compare(password, user.password);
        if(!hashPassword){
            return response.status(400).json({error: 'Incorrect password'});
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {
            expiresIn: '3h',
        });

        response.cookie('token', token,  {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 9200000
        });

        response.status(200).json({token});
    }catch(err){
        console.error(err);
        response.status(500).json({error: 'Internal server error'});
    }
}

export async function logoutUser(request, response){
    response.clearCookie('token');
    response.json({message: 'Logged out'});
}

export function authenticateUser(request, response, next){
    const token = request.cookies.token;

    if(!token){
        return response.status(400).json({error: 'Authentication required!'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.userId = decoded.userId;
        next();
    } catch(err){
        response.status(403).json({error: 'Invalid token'});
    }
}