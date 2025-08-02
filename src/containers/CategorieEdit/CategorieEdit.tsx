import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CategorieForm from "../../components/CategorieForm/CategorieForm";
import Spinner from "../../components/Spinner/Spinner";
import type { TypeCategorie } from "../../types";
import {
    editCategorieThunk,
    fetchOneCategorie,
} from "../../store/categoriesThunk";
import {
    selectEditCategorieFetching,
    selectOneCategorie,
    selectOneCategorieFetching,
} from "../../store/categoriesSlice";
import { useEffect } from "react";

const CategorieEdit = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categorie = useAppSelector(selectOneCategorie);
    const fetchOneCategorieLoading = useAppSelector(selectOneCategorieFetching);
    const editLoading = useAppSelector(selectEditCategorieFetching);

    useEffect(() => {
        dispatch(fetchOneCategorie(id));
    }, [dispatch, id]);

    const onSubmit = async (editCategorie: TypeCategorie) => {
        await dispatch(editCategorieThunk({ id, categorie: editCategorie }));
        navigate("/categories");
    };

    return (
        <div className="row mt-2">
            <div className="col-6 m-auto">
                {fetchOneCategorieLoading && <Spinner />}
                {categorie ? (
                    <CategorieForm
                        onSubmit={onSubmit}
                        isLoading={editLoading}
                        isCategorie={categorie}
                        isEdit
                    />
                ) : (
                    <div className="alert alert-warning">
                        Categorie not found!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorieEdit;
