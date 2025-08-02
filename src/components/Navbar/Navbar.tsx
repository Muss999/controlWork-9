import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-secondary mb-3" data-bs-theme="dark">
            <div className="container d-f justify-content-between">
                <Link to={"/"} className="navbar-brand">
                    Financial Tracker
                </Link>
                <div className="d-flex gap-2">
                    <Link to={"/categories"} className="btn btn-light">
                        Categories
                    </Link>
                    <Link to={"/transactions/add"} className="btn btn-light">
                        Add
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
