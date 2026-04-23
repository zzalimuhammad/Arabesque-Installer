import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Page from "../../model/Page";
import { useTranslation } from "react-i18next";
import "./SelectDevicePage.scss";
const logoUrl = new URL("../../assets/logo-light.svg", import.meta.url);

const SelectDevicePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="select-device-page">
            <div className="surface-panel panel-section select-device-card">
                <Row className="g-0 align-items-stretch">
                    <Col xs={12} lg={6} className="select-device-visual">
                        <img
                            src="images/ArabesqueKit.jpeg"
                            alt="Arabesque kit"
                        />
                    </Col>
                    <Col xs={12} lg={6} className="select-device-copy">
                        <div className="select-device-copy-inner">
                            <span className="page-kicker">{t("page.select-device.fluidnc")}</span>
                            <Card.Title>
                                <img
                                    src={logoUrl.toString()}
                                    alt="Arabesque"
                                    width={180}
                                />
                            </Card.Title>
                            <Card.Text>{t("page.select-device.fluidnc")}</Card.Text>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => navigate(Page.FLUIDNC_HOME)}
                            >
                                {t("page.select-device.continue")}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default SelectDevicePage;
