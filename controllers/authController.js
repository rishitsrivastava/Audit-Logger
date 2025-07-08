import { createUser, findUserByEmail } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export async function registerUser(req, res) {
    const { email, password, role } = req.body;
    try {
        const existing = await findUserByEmail(email);
        if (existing)
            return res.status(400).json({ message: 'User already exists.' })
        
        const user = await createUser({ email, password, role });
        res.status(201).json({ user });
    } catch (err) {
        console.error('Register error: ', err);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user)
            return res.status(400).json({ messaage: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: 'Invalid credentials, You have entered wrong password.' })
        
        const JWT_Secret = process.env.JWT_SECRET;

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_Secret, { expiresIn: '1h' })
        
        res.json({ token });
    } catch (err) {
        console.error('Login error: ', err);
        res.status(400).json({ message: 'Server error' });
    }
}