export interface Item {
    id: number;
    name: string;
    categoryId: number;
    itemImg?: string; 
    desc?: string;
    amount: number;
    price: number;
    costPrice: number;
}