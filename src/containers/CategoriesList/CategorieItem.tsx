import { useNavigate } from "react-router-dom";
import type { TypeCategorieMutation } from "../../types";
import "./CategorieItem.css";
import SpinnerButton from "../../components/Spinner/SpinnerButton";
import type { MouseEventHandler } from "react";

interface Props {
    categorie: TypeCategorieMutation;
    removeCategorie: MouseEventHandler;
    deleteLoading: boolean | string;
}

const CategorieItem = ({
    categorie,
    removeCategorie,
    deleteLoading,
}: Props) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center border p-3 rounded justify-content-between w-100">
            <div className="fs-5">{categorie.name}</div>
            <div className="d-flex gap-2 align-items-center">
                <div
                    className={`categorieItem ${
                        categorie.type === "income"
                            ? "categorieIncome"
                            : "categorieExpense"
                    }`}
                >
                    {categorie.type}
                </div>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => navigate(`/categories/${categorie.id}/edit`)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={removeCategorie}
                    disabled={
                        deleteLoading ? deleteLoading === categorie.id : false
                    }
                >
                    {deleteLoading && deleteLoading === categorie.id && (
                        <SpinnerButton />
                    )}
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CategorieItem;
