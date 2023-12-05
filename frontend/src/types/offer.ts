export const BACKEND_BASE_URL = 'http://localhost:3000';

export interface Offer {
  id: number;
  title: string;
  description: string;
  min_age: number;
  max_age: number;
  gender: string;
  status: string;
  expiration_date: string;
}