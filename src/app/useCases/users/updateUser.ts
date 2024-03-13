import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';

interface UserProps {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
}


export async function updateUser(req: Request, res: Response) {
	try {
		const _id = req.params._id;

		const { email, username, password, role } = req.body;

		if (!_id) {
			return res.status(400).json({ message: 'User ID is required.' });
		}

		// Opcional: Se você quiser permitir a atualização do e-mail, verifique se ele já existe
		if (email) {
			const existingUser = await User.findOne({ email, _id: { $ne: _id } });
			if (existingUser) {
				return res.status(400).json({ message: 'Email already exists.' });
			}
		}

		const updateData: UserProps = {};

		if (username) updateData.username = username;
		if (email) updateData.email = email;
		if (role) updateData.role = role;

		// Se a senha for fornecida, criptografe-a antes de atualizar
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			updateData.password = hashedPassword;
		}

		const updatedUser = await User.findOneAndUpdate({ _id }, { $set: updateData }, { new: true });

		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found.' });
		}

		// Opcional: Gerar um novo token se necessário
		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET is not defined');
		}
		const token = jwt.sign({ _id: updatedUser._id, role: updatedUser.role }, process.env.JWT_SECRET || '', { expiresIn: '1d' });

		res.status(200).json({ user: updatedUser, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating user.' });
	}
}
