export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock?: number;
    category: 'pollo' | 'pescado';
    created_at?: Date;
    image_url?: string; 
}

