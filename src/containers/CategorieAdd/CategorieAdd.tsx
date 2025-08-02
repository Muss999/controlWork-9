import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { TypeCategorie } from "../../types";
import CategorieForm from "../../components/CategorieForm/CategorieForm";
import { selectAddCategorieFetching } from "../../store/categoriesSlice";
import { addCategorie } from "../../store/categoriesThunk";

const CategorieAdd = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addCategorieLoading = useAppSelector(selectAddCategorieFetching);

    const onSubmit = async (categorie: TypeCategorie) => {
        await dispatch(addCategorie(categorie));
        navigate("/categories");
    };

    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                <CategorieForm
                    onSubmit={onSubmit}
                    isLoading={addCategorieLoading}
                />
            </div>
        </div>
    );
};

export default CategorieAdd;
