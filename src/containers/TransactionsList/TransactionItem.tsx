import { useNavigate } from "react-router-dom";
import type {
    TypeCategorieMutation,
    TypeTransactionMutation,
} from "../../types";
import SpinnerButton from "../../components/Spinner/SpinnerButton";
import { type JSX, type MouseEventHandler } from "react";
import dayjs from "dayjs";

interface Props {
    transaction: TypeTransactionMutation;
    deleteLoading: boolean | string;
    removeTransaction: MouseEventHandler;
    categories: TypeCategorieMutation[];
}

const TransactionItem = ({
    transaction,
    deleteLoading,
    removeTransaction,
    categories,
}: Props) => {
    const navigate = useNavigate();

    const rightCategorie: TypeCategorieMutation | undefined = categories.find(
        (categorie) => categorie.id === transaction.categorie
    );

    let transactionAmount: JSX.Element;

    if (!rightCategorie) {
        return (
            <div className="alert alert-danger w-100">
                Transaction was not found
            </div>
        );
    }

    if (rightCategorie.type === "income") {
        transactionAmount = (
            <div className="categorieIncome categorieItem">
                +{transaction.amount} KGS
            </div>
        );
    } else {
        transactionAmount = (
            <div className="categorieExpense categorieItem">
                -{transaction.amount} KGS
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center border p-3 rounded justify-content-between w-100">
            <div className="d-flex align-items-center gap-3">
                <span>
                    {dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm:ss")}
                </span>
                <div className="fs-5">{rightCategorie.name}</div>
            </div>
            <div className="d-flex gap-2 align-items-center">
                {transactionAmount}
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() =>
                        navigate(`/transactions/${transaction.id}/edit`)
                    }
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={removeTransaction}
                    disabled={
                        deleteLoading ? deleteLoading === transaction.id : false
                    }
                >
                    {deleteLoading && deleteLoading === transaction.id && (
                        <SpinnerButton />
                    )}
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TransactionItem;
