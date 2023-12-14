import React, {useContext, useEffect} from 'react'
import styles from "./employess.module.css"
import {MainContext} from "../../../../state/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

const Employees = () => {
    const {error, user, companyEmployees, getCompanyEmployees, backBaseUrl } = useContext(MainContext)
    useEffect(() => error && toast.error(error))
    useEffect(()=>{
        getCompanyEmployees(user.Company)
    }, [user])
    return (
        <>
            <div className={styles.grid_container}>
            <Container>
                <Row className={"g-5"}>
                    {
                        companyEmployees.map((employe, index)=>{
                            return (
                                <Col md={3} className={`${styles.card_col} p-3`}>
                                    <Card>
                                        <Card.Img className={styles.card_image} variant="top" src={`${backBaseUrl+employe.userAvatar?.url}`} />
                                        <Card.Body>
                                            <Card.Title>{employe.username}</Card.Title>
                                            <Card.Text>
                                                {employe.UserDesignation}
                                            </Card.Text>
                                            <Button variant="success"><Link style={{color: "#fff", textDecoration: "none"}} to={`/employes/edit/${index}`}>Edit</Link></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
            </div>
        </>
    )

}
export  default  Employees