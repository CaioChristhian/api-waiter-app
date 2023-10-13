import express from 'express';
import mongoose from 'mongoose';


const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017')
	.then(() => {

		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});

		console.log('Connected MongoDB');
	})
	.catch(() => console.log('Error connection with MongoDB'));
