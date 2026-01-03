import { create } from 'zustand'

type Item = {
    id: string
    name: string
    price: number
}

type CartItem = Item & { qty: number }

type CartStore = {
    items: CartItem[]
    add: (item: Item) => void
    increase: (id: string) => void
    decrease: (id: string) => void
    clear: () => void
}

export const useCart = create<CartStore>((set) => ({
    items: [],

    add: (item) =>
        set((state) => {
            const exist = state.items.find((i) => i.id === item.id)
            if (exist) {
                return {
                    items: state.items.map((i) =>
                        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                    ),
                }
            }
            return { items: [...state.items, { ...item, qty: 1 }] }
        }),

    increase: (id) =>
        set((state) => ({
            items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + 1 } : i
            ),
        })),

    decrease: (id) =>
        set((state) => ({
            items: state.items
                .map((i) =>
                    i.id === id ? { ...i, qty: i.qty - 1 } : i
                )
                .filter((i) => i.qty > 0),
        })),

    clear: () => set({ items: [] }),
}))
