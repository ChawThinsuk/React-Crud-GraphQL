import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                    <Link to="/">Get All Item</Link>
                </li>
                <li>
                    <Link to="/get-by-name">Get Item By Name</Link>
                </li>
                <li>
                    <Link to="/create-item">Create Item</Link>
                </li>
                <li>
                    <Link to="/update-item">Update Item</Link>
                </li>
                <li>
                    <Link to="/delete-item">Delete Item</Link>
                </li>
                <li>
                    <Link to="/create-category">Create Category</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;