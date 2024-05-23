import {defineSchema} from '@antify/database';
import mongoose from 'mongoose';

export type Auth = {
	invites: {
		invitedAt: number;
		code: string;
		context: string;
		tenantId: string | null;
	}[];
	forgotPassword: {
		sendAt: Date;
		code: string;
	} | null;
}

export default defineSchema(async (client) => {
	client.getSchema('auths').add({
		auth: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'auths',
			required: true
		},
		invites: [
			{
				invitedAt: {
					type: Number,
					required: true
				},
				code: {
					type: String,
					required: true
				},
				// TODO:: change to provider
				context: {
					type: String,
					required: true
				},
				tenantId: {
					type: String
				}
			}
		],
		forgotPassword: {
			type: {
				sendAt: {
					type: Date,
					required: true
				},
				code: {
					type: String,
					required: true
				}
			},
			default: null
		}
	});
});
