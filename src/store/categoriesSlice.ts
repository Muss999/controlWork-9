import { createSlice } from "@reduxjs/toolkit";
import type { TypeCategorieMutation } from "../types";
import { addCategorie, getCategories } from "./categoriesThunk";

interface State {
    items: TypeCategorieMutation[];
    getCategoriesFetching: boolean;
    addCategorieFetching: boolean;
}

const initialState: State = {
    items: [],
    getCategoriesFetching: false,
    addCategorieFetching: false,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.getCategoriesFetching = true;
        });
        builder.addCase(
            getCategories.fulfilled,
            (state, { payload: categories }) => {
                state.getCategoriesFetching = false;
                state.items = categories;
            }
        );
        builder.addCase(getCategories.rejected, (state) => {
            state.getCategoriesFetching = false;
        });

        builder.addCase(addCategorie.pending, (state) => {
            state.addCategorieFetching = true;
        });
        builder.addCase(addCategorie.fulfilled, (state) => {
            state.addCategorieFetching = false;
        });
        builder.addCase(addCategorie.rejected, (state) => {
            state.addCategorieFetching = false;
        });
    },
    selectors: {
        selectCategories: (state) => state.items,
        selectGetCategoriesFetching: (state) => state.getCategoriesFetching,
        selectAddCategorieFetching: (state) => state.addCategorieFetching,
    },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
    selectCategories,
    selectGetCategoriesFetching,
    selectAddCategorieFetching,
} = categoriesSlice.selectors;
