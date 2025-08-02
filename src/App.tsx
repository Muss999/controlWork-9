import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import CategoriesList from "./containers/CategoriesList/CategoriesList";

const App = () => {
    return (
        <Layout>
            <Routes>
                {["/", "/transactions"].map((path) => (
                    <Route path={path} element={<Home />} />
                ))}
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Layout>
    );
};

export default App;
