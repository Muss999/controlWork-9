import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import CategoriesList from "./containers/CategoriesList/CategoriesList";
import CategorieAdd from "./containers/CategorieAdd/CategorieAdd";
import CategorieEdit from "./containers/CategorieEdit/CategorieEdit";
import TransactionsAdd from "./containers/TransactionsAdd/TransactionsAdd";
import TransactionsEdit from "./containers/TransactionsEdit/TransactionsEdit";

const App = () => {
    return (
        <Layout>
            <Routes>
                {["/", "/transactions"].map((path) => (
                    <Route path={path} element={<Home />} />
                ))}
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="/categories/add" element={<CategorieAdd />} />
                <Route
                    path="/categories/:id/edit"
                    element={<CategorieEdit />}
                />
                <Route path="/transactions/add" element={<TransactionsAdd />} />
                <Route
                    path="/transactions/:id/edit"
                    element={<TransactionsEdit />}
                />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Layout>
    );
};

export default App;
