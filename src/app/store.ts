import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "../store/categoriesSlice";
import { TransactionsReducer } from "../store/transactionsSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        transactions: TransactionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
