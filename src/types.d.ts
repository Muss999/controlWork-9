type CategoriesType = "" | "income" | "expense";

export interface TypeCategorie {
    type: CategoriesType;
    name: string;
}
export interface TypeCategorieMutation extends TypeCategorie {
    id: string;
}
export interface TypeCategoriesList {
    [id: string]: TypeCategorie;
}
