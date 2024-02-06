import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
	try {
		const { email, username, password, role } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already exists.' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			email,
			username,
			password: hashedPassword,
			role: role || 'user'
		});

		await user.save();

		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1d' });

		res.status(201).json({ user, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user.' });
	}
}
