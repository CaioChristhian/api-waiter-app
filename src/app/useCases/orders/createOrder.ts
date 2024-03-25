import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
	try {
		const { table, products, user } = req.body;

		// Agora 'user' é passado diretamente sem necessidade de um objeto embutido
		const order = await Order.create({ table, products, user });

		res.status(201).json(order);
	} catch (error){
		console.log(error);
		res.sendStatus(500);
	}
}
