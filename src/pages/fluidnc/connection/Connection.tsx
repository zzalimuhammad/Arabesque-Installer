import React, { useCallback } from "react";
import { useState } from "react";
import { Spinner } from "../../../components";
import ConnectionState from "../../../model/ConnectionState";
import { ControllerService } from "../../../services";
import { SerialPort } from "../../../utils/serialport/SerialPort";
import "./connection.scss";
import PageTitle from "../../../components/pagetitle/PageTitle";
import usePageView from "../../../hooks/usePageView";
import ControllerLog from "../../../components/controllerlog/ControllerLog";
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useTrackEvent, {
    TrackAction,
    TrackCategory
} from "../../../hooks/useTrackEvent";

const connectImageUrl = new URL("../../../assets/connect.svg", import.meta.url);

type Props = {
    onConnect: (
        controllerService: ControllerService,
        serialPort: SerialPort
    ) => void;
};

const Connection = ({ onConnect }: Props) => {
    usePageView("Connection");
    const { t } = useTranslation();
    const trackEvent = useTrackEvent();

    const [showLog, setShowLog] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [connectionState, setConnectionState] = useState<ConnectionState>(
        ConnectionState.DISCONNECTED
    );
    const [controllerService, setControllerService] =
        useState<ControllerService>();

    const connect = useCallback(async () => {
        try {
            setErrorMessage(undefined);
            setConnectionState(ConnectionState.CONNECTING);
            const serialPortDevice: SerialPort = await (navigator as any).serial // eslint-disable-line
                .requestPort()
                .then((port) => new SerialPort(port))
                .catch((error) => {
                    setConnectionState(ConnectionState.DISCONNECTED);
                    throw error;
                });
            const info = serialPortDevice.getNativeSerialPort().getInfo();
            trackEvent(
                TrackCategory.Connect,
                TrackAction.ConnectionStart,
                `[${info.usbProductId}, ${info.usbVendorId}]`
            );

            const controllerService = new ControllerService(serialPortDevice);
            setControllerService(controllerService);

            await controllerService.connect().catch((error) => {
                console.error(error);
                setErrorMessage(
                    "Could not establish connection to the controller. Please check that nothing else is connected to it"
                );
                setConnectionState(ConnectionState.DISCONNECTED);
                trackEvent(TrackCategory.Connect, TrackAction.ConnectionFailed);
                throw error;
            });

            await new Promise((r) => setTimeout(r, 3000));
            trackEvent(TrackCategory.Connect, TrackAction.ConnectionSuccess);
            setConnectionState(ConnectionState.CONNECTED);
            onConnect(controllerService, serialPortDevice);
        } catch (_error) {
            //Never mind
        }
    }, [onConnect, trackEvent]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={7}>
                    <div className="component-connection surface-panel panel-section">
                        {(connectionState === ConnectionState.DISCONNECTED ||
                            connectionState === ConnectionState.CONNECTING) && (
                            <>
                                <span className="page-kicker">
                                    {t("page.connection.title")}
                                </span>
                                <PageTitle>
                                    {t("page.connection.title")}
                                </PageTitle>
                                <p className="page-subtitle">
                                    {t("page.connection.description")}
                                </p>
                                <div className="connection-visual mx-auto">
                                    <img
                                        className="image"
                                        src={connectImageUrl.toString()}
                                        alt="Connect"
                                    />
                                </div>
                            </>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        )}

                        {connectionState !== ConnectionState.CONNECTED && (
                            <div className="connection-actions mx-auto">
                                <Button
                                    className="w-100"
                                    onClick={connect}
                                    disabled={
                                        connectionState ===
                                        ConnectionState.CONNECTING
                                    }
                                    size="lg"
                                >
                                    <>
                                        {connectionState ===
                                            ConnectionState.CONNECTING &&
                                            t("page.connection.connecting")}
                                        {connectionState ===
                                            ConnectionState.DISCONNECTED &&
                                            t("page.connection.connect")}
                                    </>
                                </Button>
                            </div>
                        )}

                        {connectionState === ConnectionState.CONNECTING &&
                            controllerService && (
                                <Modal show={true} size="lg" centered>
                                    <Modal.Body>
                                        <h3>
                                            {t("page.connection.connecting")}
                                        </h3>
                                        <p>
                                            {t(
                                                "page.connection.establishing-connection"
                                            )} <Spinner />
                                        </p>
                                        <ControllerLog
                                            show={showLog}
                                            onShow={setShowLog}
                                            controllerService={
                                                controllerService
                                            }
                                            onError={() => {}}
                                        />
                                    </Modal.Body>
                                </Modal>
                            )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Connection;
