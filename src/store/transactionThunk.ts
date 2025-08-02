import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
    TypeTransaction,
    TypeTransactionMutation,
    TypeTransactionsList,
} from "../types";
import axiosApi from "../axiosApi";

interface editTransactionParams {
    id: string;
    transaction: TypeTransaction;
}

export const getTransactions = createAsyncThunk<TypeTransactionMutation[]>(
    "transactions/get",
    async () => {
        const { data } = await axiosApi.get<TypeTransactionsList | null>(
            "/finance/transactions.json"
        );
        let newTransactions: TypeTransactionMutation[] = [];
        if (data) {
            newTransactions = Object.keys(data).map((key) => ({
                ...data[key],
                id: key,
            }));
        }
        return newTransactions;
    }
);

export const addTransaction = createAsyncThunk<void, TypeTransaction>(
    "transactions/add",
    async (transactionData) => {
        await axiosApi.post("/finance/transactions.json", transactionData);
    }
);

export const editTransactionThunk = createAsyncThunk<
    void,
    editTransactionParams
>("transactions/edit", async ({ id, transaction }) => {
    await axiosApi.put(`/finance/transactions/${id}.json`, transaction);
});

export const fetchOneTransaction = createAsyncThunk<TypeTransaction, string>(
    "transactions/fetchOne",
    async (id) => {
        const { data: Transaction } =
            await axiosApi.get<TypeTransaction | null>(
                `/finance/transactions/${id}.json`
            );

        if (!Transaction) {
            throw new Error("Not found");
        }

        return Transaction;
    }
);

export const deleteTransaction = createAsyncThunk<void, string>(
    "transactions/delete",
    async (id) => {
        await axiosApi.delete(`/finance/transactions/${id}.json`);
    }
);
