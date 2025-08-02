import { createSlice } from "@reduxjs/toolkit";
import type { TypeTransaction, TypeTransactionMutation } from "../types";
import {
    addTransaction,
    deleteTransaction,
    editTransactionThunk,
    fetchOneTransaction,
    getTransactions,
} from "./transactionThunk";
interface State {
    items: TypeTransactionMutation[];
    getTransactionsFetching: boolean;
    addTransactionFetching: boolean;
    editTransactionFetching: boolean;
    oneTransactionFetching: boolean;
    oneTransaction: null | TypeTransaction;
    deleteTransactionFetching: boolean | string;
}

const initialState: State = {
    items: [],
    getTransactionsFetching: false,
    addTransactionFetching: false,
    editTransactionFetching: false,
    oneTransactionFetching: false,
    oneTransaction: null,
    deleteTransactionFetching: false,
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTransactions.pending, (state) => {
            state.getTransactionsFetching = true;
        });
        builder.addCase(
            getTransactions.fulfilled,
            (state, { payload: transactions }) => {
                state.getTransactionsFetching = false;
                state.items = transactions;
            }
        );
        builder.addCase(getTransactions.rejected, (state) => {
            state.getTransactionsFetching = false;
        });

        builder.addCase(addTransaction.pending, (state) => {
            state.addTransactionFetching = true;
        });
        builder.addCase(addTransaction.fulfilled, (state) => {
            state.addTransactionFetching = false;
        });
        builder.addCase(addTransaction.rejected, (state) => {
            state.addTransactionFetching = false;
        });

        builder
            .addCase(editTransactionThunk.pending, (state) => {
                state.editTransactionFetching = true;
            })
            .addCase(editTransactionThunk.fulfilled, (state) => {
                state.editTransactionFetching = false;
            })
            .addCase(editTransactionThunk.rejected, (state) => {
                state.editTransactionFetching = false;
            });

        builder
            .addCase(fetchOneTransaction.pending, (state) => {
                state.oneTransactionFetching = true;
                state.oneTransaction = null;
            })
            .addCase(
                fetchOneTransaction.fulfilled,
                (state, { payload: transaction }) => {
                    state.oneTransactionFetching = false;
                    state.oneTransaction = transaction;
                }
            )
            .addCase(fetchOneTransaction.rejected, (state) => {
                state.oneTransactionFetching = false;
            });

        builder
            .addCase(deleteTransaction.pending, (state, { meta }) => {
                state.deleteTransactionFetching = meta.arg;
            })
            .addCase(deleteTransaction.fulfilled, (state) => {
                state.deleteTransactionFetching = false;
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.deleteTransactionFetching = false;
            });
    },
    selectors: {
        selectTransactions: (state) => state.items,
        selectGetTransactionsFetching: (state) => state.getTransactionsFetching,
        selectAddTransactionFetching: (state) => state.addTransactionFetching,
        selectEditTransactionFetching: (state) => state.editTransactionFetching,
        selectOneTransactionFetching: (state) => state.oneTransactionFetching,
        selectOneTransaction: (state) => state.oneTransaction,
        selectDeleteTransactionFetching: (state) =>
            state.deleteTransactionFetching,
    },
});

export const TransactionsReducer = transactionsSlice.reducer;
export const {
    selectTransactions,
    selectGetTransactionsFetching,
    selectAddTransactionFetching,
    selectEditTransactionFetching,
    selectOneTransactionFetching,
    selectOneTransaction,
    selectDeleteTransactionFetching,
} = transactionsSlice.selectors;
