import { useNavigate, useParams } from "react-router-dom";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectEditTransactionFetching,
    selectOneTransaction,
    selectOneTransactionFetching,
} from "../../store/transactionsSlice";
import { useEffect } from "react";
import {
    editTransactionThunk,
    fetchOneTransaction,
} from "../../store/transactionThunk";
import type { TypeTransaction } from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const TransactionsEdit = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const transaction = useAppSelector(selectOneTransaction);
    const fetchOneTransactionLoading = useAppSelector(
        selectOneTransactionFetching
    );
    const editLoading = useAppSelector(selectEditTransactionFetching);

    useEffect(() => {
        dispatch(fetchOneTransaction(id));
    }, [dispatch, id]);

    const onSubmit = async (editTransaction: TypeTransaction) => {
        await dispatch(
            editTransactionThunk({ id, transaction: editTransaction })
        );
        navigate("/transactions");
    };

    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                {fetchOneTransactionLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {transaction ? (
                            <TransactionForm
                                onSubmit={onSubmit}
                                isLoading={editLoading}
                                isTransaction={transaction}
                                isEdit
                            />
                        ) : (
                            <div className="alert alert-warning">
                                Transaction not found!
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionsEdit;
