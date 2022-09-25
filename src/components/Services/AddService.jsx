import React, {useState} from "react";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Header from "../Header/Header";
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {useNavigate, Navigate} from 'react-router-dom'

const AddServices =  () => {

    const  [name, setName] = useState("");
    const [img, setImg] = useState({});
    const [imgUrl, setImgUrl] = useState("");
    const [VectorUrl, setVectorUrl] = useState("");
    const [percentage, setPercentage] = useState(null);
    const [vector, setVector] = useState({});
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let lstrUrl;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const imgName2 = new Date().getTime() + vector.name;
            const storageRef2 = ref(storage, 'images/' + imgName2);
            const uploadTask2 = uploadBytesResumable(storageRef2, vector);

            uploadTask2.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPercentage(progress);
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask2.snapshot.ref).then(async (downloadURL) => {
                        lstrUrl = downloadURL;
                        setVectorUrl(downloadURL.toString());
                        const imgName = new Date().getTime() + img.name;
                        const storageRef = ref(storage, 'images/' + imgName);
                        const uploadTask = uploadBytesResumable(storageRef, img);

                        uploadTask.on('state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setPercentage(progress);
                            },
                            (error) => {

                            },
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                    setImgUrl(downloadURL.toString());
                                    await setDoc(doc(db, "services" , name), {
                                        Name: name,
                                        Description: description,
                                        Image:  downloadURL,
                                        Vector: lstrUrl
                                    });
                                });
                            }
                        );

                    });
                    setLoading(false);
                    navigate('/Services');
                }
            );
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        }
    }


    return(
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
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
                                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                        <Form.Control required type="text"  placeholder="Name" name="name" value={name} onChange={e=>setName(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingDescription" label="Description">
                                        <Form.Control required type="text" placeholder="Description" name="description" value={description} onChange={e=>setDescription(e.target.value)} />
                                    </FloatingLabel>
                                    {/*<FloatingLabel controlId="floatingVector" label="Vector">*/}
                                    {/*    <Form.Control required type="text" placeholder="Vector" name="linkedin" value={vector} onChange={e=>setVector(e.target.value)} />*/}
                                    {/*</FloatingLabel>*/}
                                    <Form.Group className="mb-3" id="floatingVector" style={{width: '86%'}}>
                                        <Form.Label>Vector</Form.Label>
                                        <Form.Control required type="file" name="vector"  onChange={e=>setVector(e.target.files[0])} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" id="formImage" style={{width: '86%'}}>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control required type="file" name="image"  onChange={e=>setImg(e.target.files[0])} />
                                    </Form.Group>
                                    <div style={{textAlign: "center"}}>
                                        <Button variant="primary" type="submit" disabled={percentage !== null && percentage<100}>
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
export default AddServices;