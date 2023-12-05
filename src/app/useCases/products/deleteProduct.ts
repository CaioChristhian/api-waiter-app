import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function deleteProduct(req: Request, res: Response) {
	try {
		const productId = req.params._id;
		const product = await Product.findByIdAndDelete(productId);

		if (!product) {
			res.status(404).json({ message: `Product with id=${productId} not found` });
		} else {
			res.json({ message: 'Product deleted successfully' });
		}
	} catch (error){
		console.log(error);
		res.sendStatus(500);
	}
}
