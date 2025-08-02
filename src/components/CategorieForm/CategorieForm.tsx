import { useNavigate } from "react-router-dom";
import SpinnerButton from "../Spinner/SpinnerButton";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { TypeCategorie } from "../../types";

interface Props {
    onSubmit: (categorie: TypeCategorie) => void;
    isLoading?: boolean;
    isCategorie?: TypeCategorie;
    isEdit?: boolean;
}
const initialState: TypeCategorie = {
    name: "",
    type: "",
};

const CategorieForm = ({
    onSubmit,
    isLoading = false,
    isCategorie = initialState,
    isEdit = false,
}: Props) => {
    const navigate = useNavigate();
    const [categorie, setCategorie] = useState<TypeCategorie>(isCategorie);

    const changeCategorie = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setCategorie((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const onSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        const categorieName = categorie.name.trim();

        if (!categorieName) {
            alert("Name input is not valid");
            return;
        } else if (!categorie.type) {
            alert("Choose type of categorie!");
            return;
        }

        const newCategorie: TypeCategorie = {
            name: categorieName,
            type: categorie.type,
        };
        onSubmit(newCategorie);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <h4>{isEdit ? "Edit categorie" : "Add new categorie"}</h4>
            <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={categorie.name}
                    onChange={changeCategorie}
                    autoFocus
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="selectType" className="form-label">
                    Select Type
                </label>
                <select
                    id="selectType"
                    name="type"
                    className="form-select"
                    value={categorie.type}
                    onChange={changeCategorie}
                >
                    <option value="" disabled hidden>
                        Select Type
                    </option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
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
                    onClick={() => navigate("/categories")}
                >
                    Back to categories
                </button>
            </div>
        </form>
    );
};

export default CategorieForm;
