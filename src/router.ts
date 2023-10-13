import { Router } from 'express';
import { listCategories } from './app/useCases/categories/listCategories';

export const router = Router();

//List Catergories
router.get('/categories', listCategories);

//Create Catergory
router.post('/categories', (req, res) => {
	res.send('Ok');
});

//List Products
router.get('/products', (req, res) => {
	res.send('Ok');
});

//Create Product
router.post('/products', (req, res) => {
	res.send('Ok');
});

//Get Products by Catergory
router.get('/categories/:categoryId/products', (req, res) => {
	res.send('Ok');
});

//List Orders
router.get('/orders', (req, res) => {
	res.send('Ok');
});

//Create Order
router.post('/orders', (req, res) => {
	res.send('Ok');
});

//Change Order Status
router.patch('/orders/:orderId', (req, res) => {
	res.send('Ok');
});

//Delete/cancel Order
router.delete('/orders/:orderId', (req, res) => {
	res.send('Ok');
});
