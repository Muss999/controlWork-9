import { createSlice } from "@reduxjs/toolkit";
import type { TypeCategorie, TypeCategorieMutation } from "../types";
import {
    addCategorie,
    deleteCategorie,
    editCategorieThunk,
    fetchOneCategorie,
    getCategories,
} from "./categoriesThunk";

interface State {
    items: TypeCategorieMutation[];
    getCategoriesFetching: boolean;
    addCategorieFetching: boolean;
    editCategorieFetching: boolean;
    oneCategorieFetching: boolean;
    oneCategorie: null | TypeCategorie;
    deleteCategorieFetching: boolean | string;
}

const initialState: State = {
    items: [],
    getCategoriesFetching: false,
    addCategorieFetching: false,
    editCategorieFetching: false,
    oneCategorieFetching: false,
    oneCategorie: null,
    deleteCategorieFetching: false,
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

        builder
            .addCase(editCategorieThunk.pending, (state) => {
                state.editCategorieFetching = true;
            })
            .addCase(editCategorieThunk.fulfilled, (state) => {
                state.editCategorieFetching = false;
            })
            .addCase(editCategorieThunk.rejected, (state) => {
                state.editCategorieFetching = false;
            });

        builder
            .addCase(fetchOneCategorie.pending, (state) => {
                state.oneCategorieFetching = true;
                state.oneCategorie = null;
            })
            .addCase(
                fetchOneCategorie.fulfilled,
                (state, { payload: categorie }) => {
                    state.oneCategorieFetching = false;
                    state.oneCategorie = categorie;
                }
            )
            .addCase(fetchOneCategorie.rejected, (state) => {
                state.oneCategorieFetching = false;
            });

        builder
            .addCase(deleteCategorie.pending, (state, { meta }) => {
                state.deleteCategorieFetching = meta.arg;
            })
            .addCase(deleteCategorie.fulfilled, (state) => {
                state.deleteCategorieFetching = false;
            })
            .addCase(deleteCategorie.rejected, (state) => {
                state.deleteCategorieFetching = false;
            });
    },
    selectors: {
        selectCategories: (state) => state.items,
        selectGetCategoriesFetching: (state) => state.getCategoriesFetching,
        selectAddCategorieFetching: (state) => state.addCategorieFetching,
        selectEditCategorieFetching: (state) => state.editCategorieFetching,
        selectOneCategorieFetching: (state) => state.oneCategorieFetching,
        selectOneCategorie: (state) => state.oneCategorie,
        selectDeleteCategorieFetching: (state) => state.deleteCategorieFetching,
    },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
    selectCategories,
    selectGetCategoriesFetching,
    selectAddCategorieFetching,
    selectEditCategorieFetching,
    selectOneCategorieFetching,
    selectOneCategorie,
    selectDeleteCategorieFetching,
} = categoriesSlice.selectors;
