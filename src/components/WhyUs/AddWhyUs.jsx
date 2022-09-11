import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {db, storage} from "../../firebase";
import {addDoc, collection} from "firebase/firestore";
import Header from "../Header/Header";
import Container from "react-bootstrap/Container";
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddWhyUs =  () => {

    const  [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "whyus"), {
                Title: title,
                SubTitle: subTitle,
                Description: description,
            });

            setLoading(false);
            navigate('/team');
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        }
    }


    return(
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"/>
                </div>
            ) : (
                <>
                    <Header/>
                    <Container className="mt-4">
                        <Row>
                            <Col></Col>
                            <Col xs={6}>
                                <p style={{color: "red"}}>Note: All fields are required. Please enter all fields.</p>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingTitle" label="Title" className="mb-3">
                                        <Form.Control required type="text"  placeholder="Title" name="title" value={title} onChange={e=>setTitle(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingSubTitle" label="SubTitle">
                                        <Form.Control required type="text" placeholder="SubTitle" name="subTitle" value={subTitle} onChange={e=>setSubTitle(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingDescription" label="Description">
                                        <Form.Control required type="text" placeholder="Description" name="description" value={description} onChange={e=>setDescription(e.target.value)} />
                                    </FloatingLabel>
                                    <div style={{textAlign: "center"}}>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>

                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>

                </>)}
        </div>
    )
}

export default AddWhyUs;