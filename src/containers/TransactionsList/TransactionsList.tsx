import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import TransactionItem from "./TransactionItem";
import { useEffect } from "react";
import {
    deleteTransaction,
    getTransactions,
} from "../../store/transactionThunk";
import {
    selectDeleteTransactionFetching,
    selectGetTransactionsFetching,
    selectTransactions,
} from "../../store/transactionsSlice";
import {
    selectCategories,
    selectGetCategoriesFetching,
} from "../../store/categoriesSlice";
import { getCategories } from "../../store/categoriesThunk";

const TransactionsList = () => {
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactions);
    const transactionsLoading = useAppSelector(selectGetTransactionsFetching);
    const deleteLoading = useAppSelector(selectDeleteTransactionFetching);
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectGetCategoriesFetching);

    useEffect(() => {
        dispatch(getTransactions());
        dispatch(getCategories());
    }, [dispatch]);

    const removeTransaction = async (id: string) => {
        if (window.confirm("Do you really want to delete this transaction?")) {
            await dispatch(deleteTransaction(id));
            await dispatch(getTransactions());
        }
    };

    const totalCost = transactions.reduce((acc, transaction) => {
        const categorie = categories.find(
            (c) => c.id === transaction.categorie
        );
        if (!categorie) return acc;

        return categorie.type === "income"
            ? acc + transaction.amount
            : acc - transaction.amount;
    }, 0);

    const sortedTransactions = [...transactions].sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h4 className="m-0 text-secondary">
                    Total:
                    <span
                        className={
                            totalCost > 0
                                ? "categorieIncome"
                                : totalCost < 0
                                ? "categorieExpense"
                                : "text-secondary"
                        }
                    >
                        {` ${totalCost} KGS`}
                    </span>
                </h4>
            </div>

            {transactionsLoading || categoriesLoading ? (
                <Spinner />
            ) : (
                <>
                    {sortedTransactions.length === 0 ? (
                        <div className="alert alert-warning">
                            Transactions was not found
                        </div>
                    ) : (
                        <div className="categoriesList d-flex flex-wrap gap-3">
                            {sortedTransactions.map((transaction) => {
                                return (
                                    <TransactionItem
                                        transaction={transaction}
                                        deleteLoading={deleteLoading}
                                        categories={categories}
                                        removeTransaction={() =>
                                            removeTransaction(transaction.id)
                                        }
                                        key={transaction.id}
                                    />
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default TransactionsList;
