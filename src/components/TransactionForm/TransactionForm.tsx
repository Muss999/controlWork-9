import { useNavigate } from "react-router-dom";
import SpinnerButton from "../Spinner/SpinnerButton";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { CategoriesType, TypeTransaction } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectCategories,
    selectGetCategoriesFetching,
} from "../../store/categoriesSlice";
import { getCategories } from "../../store/categoriesThunk";
import Spinner from "../Spinner/Spinner";

interface Props {
    onSubmit: (transaction: TypeTransaction) => void;
    isTransaction?: TypeTransaction;
    isLoading?: boolean;
    isEdit?: boolean;
}
const initialState: TypeTransaction = {
    categorie: "",
    amount: 0,
    createdAt: "",
};

const TransactionForm = ({
    onSubmit,
    isLoading = false,
    isTransaction = initialState,
    isEdit = false,
}: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [transaction, setTransaction] =
        useState<TypeTransaction>(isTransaction);
    const [selectedType, setSelectedType] = useState<CategoriesType>("income");

    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectGetCategoriesFetching);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        setTransaction((prev) => ({
            ...prev,
            categorie: "",
        }));
    }, [selectedType]);

    useEffect(() => {
        if (categoriesLoading) return;
        setTransaction(isTransaction);

        if (isEdit && isTransaction.categorie) {
            const foundCategorie = categories.find(
                (cat) => cat.id === isTransaction.categorie
            );
            if (foundCategorie) {
                setSelectedType(foundCategorie.type);
            }
        }
    }, [isEdit, isTransaction, categories, categoriesLoading]);

    const filteredCategories = categories.filter(
        (categorie) => categorie.type === selectedType
    );

    const changeTransaction = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setTransaction((prevState) => ({
            ...prevState,
            [name]: name === "amount" ? +value : value,
        }));
    };

    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();

        if (transaction.amount <= 0) {
            alert("Amount input is not correct");
            return;
        }
        let createdAtData = new Date().toISOString();

        if (isEdit) {
            createdAtData = transaction.createdAt;
        }

        const newTransaction: TypeTransaction = {
            categorie: transaction.categorie,
            amount: transaction.amount,
            createdAt: createdAtData,
        };
        onSubmit(newTransaction);
    };

    return (
        <>
            {categoriesLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={onSubmitHandler}>
                    <h4>
                        {isEdit ? "Edit transaction" : "Add new transaction"}
                    </h4>
                    <div className="mb-3">
                        <label htmlFor="selectType" className="form-label">
                            Select Type
                        </label>
                        <select
                            id="selectType"
                            name="type"
                            className="form-select"
                            value={selectedType}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setSelectedType(
                                    e.target.value as CategoriesType
                                )
                            }
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="selectTransactionCategorie"
                            className="form-label"
                        >
                            Select Categorie
                        </label>
                        <select
                            id="selectTransactionCategorie"
                            name="categorie"
                            className="form-select"
                            value={transaction.categorie}
                            onChange={changeTransaction}
                            required
                        >
                            <option value="" disabled hidden>
                                Select categorie
                            </option>
                            {filteredCategories.map((categorie) => {
                                return (
                                    <option
                                        value={categorie.id}
                                        key={categorie.id}
                                    >
                                        {categorie.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="transactionAmount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            id="transactionAmount"
                            className="form-control"
                            value={transaction.amount}
                            onChange={changeTransaction}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-success me-2"
                            disabled={isLoading}
                        >
                            {isLoading && <SpinnerButton />}
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/transactions")}
                        >
                            Back to transactions
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default TransactionForm;
