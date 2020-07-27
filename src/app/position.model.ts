import { Product } from './product.model';

export class Position {
    constructor(
        public product: Product,
        public quantity: number
    ) { }

    public getSubTotal(): number {
        return this.product.price * this.quantity;
    }

    
}