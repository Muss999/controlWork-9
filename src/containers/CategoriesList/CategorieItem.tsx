import { useNavigate } from "react-router-dom";
import type { TypeCategorieMutation } from "../../types";
import "./CategorieItem.css";

interface Props {
    categorie: TypeCategorieMutation;
}

const CategorieItem = ({ categorie }: Props) => {
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
                    onClick={() => navigate(`/cateries/${categorie.id}/edit`)}
                >
                    Edit
                </button>
                <button type="button" className="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CategorieItem;
