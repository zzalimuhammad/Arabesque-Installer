import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Footer.scss";
import usePopupTerminalStore from "../../store/PopupTerminalStore";
import { faTerminal } from "@fortawesome/free-solid-svg-icons/faTerminal";
import { Button } from "react-bootstrap";

const Footer = () => {
    const { showPopupTerminal, setShowPopupTerminal, isConnected } =
        usePopupTerminalStore();

    return (
        <footer className="footer page-footer font-small blue pt-4">
            <ul className="list-unstyled d-flex align-items-center mb-0">
                <li className="me-3">
                    <a
                        href="https://discord.gg/d3aSTvP69p"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faDiscord as IconDefinition} />{" "}
                        Discord
                    </a>
                </li>
                <li className="me-3">
                    <a
                        href="https://github.com/zzalimuhammad/Arabesque"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub as IconDefinition} />{" "}
                        Arabesque
                    </a>
                </li>
                <li className="me-3">
                    <a
                        href="https://github.com/zzalimuhammad/Arabesque-Installer"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faGithub as IconDefinition} />{" "}
                        Installer
                    </a>
                </li>
                {isConnected && (
                    <li className="footer-terminal">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                                setShowPopupTerminal(!showPopupTerminal)
                            }
                        >
                            <FontAwesomeIcon
                                icon={faTerminal as IconDefinition}
                            />
                        </Button>
                    </li>
                )}
            </ul>
        </footer>
    );
};

export default Footer;
