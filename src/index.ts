/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017')
	.then(() => {

		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
		app.use(express.json());
		app.use(router);

		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});

		console.log('Connected MongoDB');
	})
	.catch(() => console.log('Error connection with MongoDB'));
