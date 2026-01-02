import { computed } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type CartStore = {
    [key: string]: CartItem;
}

// Persist cart to localStorage with key 'isru-cart'
export const cartItems = persistentMap<CartStore>('isru-cart:', {});

// Computed values
export const cartCount = computed(cartItems, items => {
    return Object.values(items).reduce((acc, item) => acc + item.quantity, 0);
});

export const cartTotal = computed(cartItems, items => {
    return Object.values(items).reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

// Actions
export function addCartItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const existing = cartItems.get()[item.id.toString()];
    if (existing) {
        cartItems.setKey(item.id.toString(), {
            ...existing,
            quantity: existing.quantity + quantity
        });
    } else {
        cartItems.setKey(item.id.toString(), {
            ...item,
            quantity
        });
    }
}

export function removeCartItem(id: number) {
    cartItems.setKey(id.toString(), undefined);
}

export function updateCartQuantity(id: number, quantity: number) {
    const existing = cartItems.get()[id.toString()];
    if (existing) {
        if (quantity <= 0) {
            removeCartItem(id);
        } else {
            cartItems.setKey(id.toString(), {
                ...existing,
                quantity
            });
        }
    }
}

export const isCartOpen = persistentMap<{ isOpen: string }>('isru-cart-state:', { isOpen: 'false' });

export function toggleCart(open: boolean) {
    isCartOpen.setKey('isOpen', String(open));
}
