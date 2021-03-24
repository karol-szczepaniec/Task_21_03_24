import React, {useEffect, useState} from "react";
import {Row, Col, Toast, Button, Alert} from "react-bootstrap"

export default function ToastModal({response, setReset}){

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);


    return(
        <Row style={{position: "absolute", left: "10px", top: "10px", width: "400px"}}>
            <Col xs={12}>
                <Toast show={showA} onClose={()=>{
                    toggleShowA()
                    setReset()
                }}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto text-success" >Response</strong>
                        <small className="text-success" >Status: {response ? response.status : "-"}</small>
                    </Toast.Header>
                    <Toast.Body>
                        <Alert
                            variant="success"
                            className="d-flex flex-column align-items-center"
                        >
                            <h5>Id: {response ? response.data.id : "-"}</h5>
                            <h6>{response ? response.data.title : "-"}</h6>
                            <p>{response ? response.data.body : "-"}</p>
                        </Alert>
                    </Toast.Body>
                </Toast>
            </Col>
            {/*<Col xs={6}>*/}
            {/*    <Button onClick={toggleShowA}>*/}
            {/*        Toggle Toast <strong>with</strong> Animation*/}
            {/*    </Button>*/}
            {/*</Col>*/}
        </Row>
        )
}