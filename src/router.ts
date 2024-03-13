import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { updateProduct } from './app/useCases/products/updateProduct';
import { deleteProduct } from './app/useCases/products/deleteProduct';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { createUser } from './app/useCases/users/createUser';
import { loginUser } from './app/useCases/users/loginUser';
import { deleteUser } from './app/useCases/users/deleteUser';
import { listUsers } from './app/useCases/users/listUsers';
import { updateUser } from './app/useCases/users/updateUser';

export const router = Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	})
});

// ----- Users -----

//Create User
router.post('/users', createUser);

//Login User
router.post('/userslogin', loginUser);

//Delete User
router.delete('/users/:_id', deleteUser);

//List Users
router.get('/users', listUsers);

//Update User
router.put('/users/:_id', updateUser);

// ----- Categories -----

//List Catergories
router.get('/categories', listCategories);

//Create Catergory
router.post('/categories', createCategory);


// ----- Products -----

//List Products
router.get('/products', listProducts);

//Create Product
router.post('/products', upload.single('image'), createProduct);

//Get Products by Catergory
router.get('/categories/:categoryId/products', listProductsByCategory);

//Update Product by Id
router.put('/products/:_id', upload.single('image'), updateProduct);

//Delete Product by Id
router.delete('/products/:_id', deleteProduct);


// ----- Orders -----

//List Orders
router.get('/orders', listOrders);

//Create Order
router.post('/orders', createOrder);

//Change Order Status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/cancel Order
router.delete('/orders/:orderId', cancelOrder);
