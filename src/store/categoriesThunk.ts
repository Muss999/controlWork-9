import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    TypeCategorie,
    TypeCategorieMutation,
    TypeCategoriesList,
} from "../types";
import axiosApi from "../axiosApi";

export const getCategories = createAsyncThunk<TypeCategorieMutation[]>(
    "categories/get",
    async () => {
        const { data } = await axiosApi.get<TypeCategoriesList | null>(
            "/finance/categories.json"
        );
        let newCategories: TypeCategorieMutation[] = [];
        if (data) {
            newCategories = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
            }));
        }
        return newCategories;
    }
);

export const addCategorie = createAsyncThunk<void, TypeCategorie>(
    "categories/add",
    async (apiCategorie) => {
        await axiosApi.post("/finance/categories.json", apiCategorie);
    }
);
