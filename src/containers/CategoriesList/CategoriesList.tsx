import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectCategories,
    selectGetCategoriesFetching,
} from "../../store/categoriesSlice";
import CategorieItem from "./CategorieItem";
import { getCategories } from "../../store/categoriesThunk";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectGetCategoriesFetching);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <h4 className="m-0">Categories</h4>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/categories/add")}
                >
                    Add Categorie
                </button>
            </div>
            {categoriesLoading ? (
                <Spinner />
            ) : (
                <div className="categoriesList d-flex flex-wrap gap-3">
                    {categories.map((categorie) => {
                        return (
                            <CategorieItem
                                categorie={categorie}
                                key={categorie.id}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default CategoriesList;
