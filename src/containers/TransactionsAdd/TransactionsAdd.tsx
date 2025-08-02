import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import { selectAddTransactionFetching } from "../../store/transactionsSlice";
import type { TypeTransaction } from "../../types";
import { addTransaction } from "../../store/transactionThunk";

const TransactionsAdd = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addTransactionLoading = useAppSelector(selectAddTransactionFetching);

    const onSubmit = async (transaction: TypeTransaction) => {
        await dispatch(addTransaction(transaction));
        navigate("/transactions");
    };

    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                <TransactionForm
                    onSubmit={onSubmit}
                    isLoading={addTransactionLoading}
                />
            </div>
        </div>
    );
};

export default TransactionsAdd;
