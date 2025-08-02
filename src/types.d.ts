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

export interface TypeTransaction {
    categorie: string;
    amount: number;
    createdAt: number;
}
export interface TypeTransactionMutation extends TypeTransaction {
    id: string;
}
export interface TypeTransactionsList {
    [id: string]: TypeTransaction;
}
