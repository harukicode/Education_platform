export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  preferences?: {
    technologies: string[];
    languages: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}