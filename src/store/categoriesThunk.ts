import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    TypeCategorie,
    TypeCategorieMutation,
    TypeCategoriesList,
} from "../types";
import axiosApi from "../axiosApi";

interface editCategorieParams {
    id: string;
    categorie: TypeCategorie;
}

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

export const editCategorieThunk = createAsyncThunk<void, editCategorieParams>(
    "categories/edit",
    async ({ id, categorie }) => {
        await axiosApi.put(`/finance/categories/${id}.json`, categorie);
    }
);

export const fetchOneCategorie = createAsyncThunk<TypeCategorie, string>(
    "categories/fetchOne",
    async (id) => {
        const { data: categorie } = await axiosApi.get<TypeCategorie | null>(
            `/finance/categories/${id}.json`
        );

        if (!categorie) {
            throw new Error("Not found");
        }

        return categorie;
    }
);

export const deleteCategorie = createAsyncThunk<void, string>(
    "categories/delete",
    async (id) => {
        await axiosApi.delete(`/finance/categories/${id}.json`);
    }
);
