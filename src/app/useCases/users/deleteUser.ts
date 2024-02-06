import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function deleteUser(req: Request, res: Response) {
	try {
		const userId = req.params._id;
		const user = await User.findByIdAndDelete(userId);

		if (!user) {
			res.status(404).json({ message: `User with id=${userId} not found` });
		} else {
			res.json({ message: 'User deleted successfully' });
		}
	} catch (error){
		console.log(error);

		res.sendStatus(500);
	}
}
