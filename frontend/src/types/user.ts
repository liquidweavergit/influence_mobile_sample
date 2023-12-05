export const BACKEND_BASE_URL = 'http://localhost:3000';

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  birthdate: string;
  gender: string;
  admin: boolean;
  email: string;
  password?: string;
  password_confirmation?: string;
}

export const initialUser: User = {
  first_name: '',
  last_name: '',
  username: '',
  birthdate: '',
  gender: '',
  admin: false,
  email: '',
  password: '',
  password_confirmation: '',
}

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;