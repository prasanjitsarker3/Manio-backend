export type TProduct = {
  name: string;
  price: number;
  size: string[];
  color: string[];
  rating: 5;
  stock: number;
  details: string;
  discount?: number;
  image?: string[];
  discountPrice?: number;
  isDeleted?: boolean;
};
