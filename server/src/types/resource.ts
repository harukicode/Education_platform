import {Types} from 'mongoose'

export interface IGithubMetadata {
	stars: number;
	forks?: number;
	language: string;
	owner: string;
	topics: string[];
	updatedAt?: Date;
}

export interface IResource {
	_id?: string;
	userId: Types.ObjectId | string;
	type: 'github',
	originalId: string;
	title: string;
	description?: string;
	url: string;
	thumbnailUrl?: string;
	metadata: IGithubMetadata;
	status: 'saved' | 'in_progress' | 'completed';
	tags?: string[];
	folder?: Types.ObjectId | string;
	notes?: string;
	createdAt?: Date;
	updatedAt?: Date;
}