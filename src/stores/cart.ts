import { atom, map } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export const isCartOpen = atom(false);
export const cartItems = persistentMap<Record<string, CartItem>>('isru_cart', {}, {
    encode: JSON.stringify,
    decode: (str) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.error('Failed to parse cart items:', e);
            return {};
        }
    },
});

export const cartTotal = atom(0);

// Computed total listener
cartItems.subscribe(items => {
    const total = Object.values(items).reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.set(total);
});

export function addCartItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const idStr = item.id.toString();
    const existing = cartItems.get()[idStr];
    if (existing) {
        cartItems.setKey(idStr, { ...existing, quantity: existing.quantity + quantity });
    } else {
        cartItems.setKey(idStr, { ...item, quantity });
    }
    isCartOpen.set(true);
}

export function removeCartItem(id: number) {
    const current = cartItems.get();
    const { [id.toString()]: removed, ...rest } = current;
    cartItems.set(rest);
}

export function updateCartQuantity(id: number, quantity: number) {
    const idStr = id.toString();
    const item = cartItems.get()[idStr];
    if (!item) return;

    if (quantity <= 0) {
        removeCartItem(id);
    } else {
        cartItems.setKey(idStr, { ...item, quantity });
    }
}

export function toggleCart(open: boolean) {
    isCartOpen.set(open);
}
