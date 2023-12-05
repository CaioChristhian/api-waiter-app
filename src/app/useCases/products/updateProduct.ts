/* eslint-disable prefer-const */
import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function updateProduct(req: Request, res: Response) {
	try {
		const productId = req.params._id;
		let { name, description, imagePath, price, category, ingredients } = req.body;

		// Se uma nova imagem foi enviada, atualize o caminho da imagem
		if (req.file) {
			imagePath = req.file.filename;
		}

		const product = await Product.findByIdAndUpdate(productId, {
			name,
			description,
			imagePath,
			price: Number(price),
			category,
			ingredients: ingredients ? JSON.parse(ingredients) : []
		}, { new: true });

		if (!product) {
			res.status(404).json({ message: `Product with id=${productId} not found` });
		} else {
			res.json(product);
		}
	} catch (error){
		console.log(error);
		res.sendStatus(500);
	}
}
