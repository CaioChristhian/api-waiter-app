import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

export async function loginUser(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password.' });
		}

		if (!user.password) {
			throw new Error('User does not have a password field.');
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ message: 'Invalid password.' });
		}

		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

		res.status(200).json({ user, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error logging in.' });
	}
}
