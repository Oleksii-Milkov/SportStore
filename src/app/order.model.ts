import { Position } from './position.model';

export class Order {
    constructor(
        public cart: Position[],
        public name: string,
        public email: string,
        public phone: string,
        public address: string,
        public id?: number
    ){ }
}