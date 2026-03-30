import React from "react";
import "./Header.scss";
import { Dropdown, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Page from "../../model/Page";

const logoUrl = new URL("../../assets/logo.svg", import.meta.url);

const Header = () => {
    const location = useLocation();
    return (
        <Navbar
            expand="sm"
            bg="dark"
            data-bs-theme="dark"
            className="header"
            style={{ height: "78px" }}
        >
            <NavDropdown
                className="left"
                title={
                    <Navbar.Brand>
                        {(location.pathname.startsWith("/Arabesque") ||
                            location.pathname == "/") && (
                            <img
                                src={logoUrl.toString()}
                                alt="Arabesque logo"
                                width={210}
                            />
                        )}
                    </Navbar.Brand>
                }
            >
                <Dropdown.Item as={Link} to={Page.HOME}>
                    Home
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to={Page.FLUIDNC_HOME}>
                    Arabesque
                </Dropdown.Item>
            </NavDropdown>

            <Navbar.Toggle />
        </Navbar>
    );
};
export default Header;
