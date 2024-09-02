import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price;
        },

        increaseCartQuantity: (state, action) => {
            state.quantity += 1;
            const product = state.products.find(
                (product) => product.id === action.payload.id
            )
            product.quantity += 1;
            state.total += action.payload.price;
        },

        decreaseCartQuantity: (state, action) => {
            state.quantity -= 1;
            const product = state.products.find((product) => product.id === action.payload.id);
            if (product.quantity === 1) {
                state.products = state.products.filter(
                    (product) => product.id !== action.payload.id
                )
            } else {
                product.quantity -= 1;
            }
            state.total -= action.payload.price ;
        },

        removeProduct: (state, action) => {
            const product = state.products.find((product) => product.id === action.payload.id);
            state.products = state.products.filter(
                (product) => product.id !== action.payload.id
            )
            state.total -= action.payload.price * product.quantity;

            state.quantity -= 1 * product.quantity;
        },
        emptyCart: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },
        setCart: (state, action) => {
            state.quantity = action.payload.quantity;
            state.products = action.payload.products;
            state.total = action.payload.total;
        },
       
    },
});

export const { increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions;
export const { setCart } = cartSlice.actions;
export const { emptyCart } = cartSlice.actions;
export const { addProduct } = cartSlice.actions;
export const { removeProduct } = cartSlice.actions;
export default cartSlice.reducer;