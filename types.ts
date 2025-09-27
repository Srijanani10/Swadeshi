// types.ts
export type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  endorsements?: string[];
};

export type BundleType = {
  id: number;
  title: string;
  season: string;
  products: ProductType[];
};
