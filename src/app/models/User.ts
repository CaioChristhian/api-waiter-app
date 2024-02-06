import { model, Schema } from 'mongoose';

export const User =  model( 'User', new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	}
}));
