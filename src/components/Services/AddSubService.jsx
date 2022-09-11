import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {db, storage} from "../../firebase";
import {addDoc, collection} from "firebase/firestore";
import Header from "../Header/Header";
import Container from "react-bootstrap/Container";
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const AddSubService =  (props) => {

    const  [name, setName] = useState("");
    const [imgSrc, setImgSrc] = useState({});
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(null);
    const [url, setUrl] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const imgName = new Date().getTime() + imgSrc.name;
            const storageRef = ref(storage, 'subservices/' + imgName);
            const uploadTask = uploadBytesResumable(storageRef, imgSrc);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('Upload is ' + progress + '% done');
                    setPercentage(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            //console.log('Upload is paused');
                            break;
                        case 'running':
                            //console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        setUrl(downloadURL);
                        await addDoc(collection(db, "services/" + props.id + "SubServices"), {
                            Name: name,
                            Description: description,
                            Image: downloadURL
                        });
                    });
                    setLoading(false);
                    navigate('/team');
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
                                    <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                                        <Form.Control required type="text"  placeholder="Name" name="title" value={name} onChange={e=>setName(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingDescription" label="Description">
                                        <Form.Control required type="text" placeholder="Description" name="subTitle" value={description} onChange={e=>setDescription(e.target.value)} />
                                    </FloatingLabel>
                                    <Form.Group className="mb-3" id="formImage" style={{width: '86%'}}>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control required type="file" name="image"  onChange={e=>setImgSrc(e.target.files[0])} />
                                    </Form.Group>
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

export default AddSubService;