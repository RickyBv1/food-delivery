import { Product } from './products';

export interface Category {
  id: number;
  name: string;
  pictureUrl: string;
  products: Product[];
}
