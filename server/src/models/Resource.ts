import * as mongoose from 'mongoose'
import { IResource } from '../types/resource'

const resourceSchema = new mongoose.Schema<IResource>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	type: {
		type: String,
		enum: ['github'],
		default: 'github'
	},
	originalId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	url: {
		type: String,
		required: true,
		validate: {
			validator: function (v: string) {
				return /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/.test(v)
			},
			message: (props: { value: string }) => `${props.value} is not a valid URL!`,
		}
	},
	thumbnailUrl: String,
	metadata: {
		stars: {
			type: Number,
			default: 0,
			min: 0,
		},
		forks: {
			type: Number,
			default: 0,
			min: 0,
		},
		language: String,
		owner: {
			type: String,
			required: true,
		},
		topics: {
			type: [String],
			default: [],
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		}
	},
	status: {
		type: String,
		enum: ['saved', 'in_progress', 'completed'],
		default: 'saved',
	},
	tags: {
		type: [String],
		default: [],
	},
	folder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Folder',
	},
	notes: String,
}, {timestamps: true});

resourceSchema.index({ userId: 1, originalId: 1 }, { unique: true });

const Resource = mongoose.model<IResource>("Resource", resourceSchema);

export default Resource;