import React, {useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Header from "../Header/Header";
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import './team.css';
import {useNavigate, Navigate} from 'react-router-dom'

const AddTeam =  () => {
    const  [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [file, setFile] = useState({});
    const [url, setUrl] = useState("");
    const [percentage, setPercentage] = useState(null);
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [fb, setFb] = useState("");
    const [insta, setInsta] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const imgName = new Date().getTime() + file.name;
            //const storageRef = ref(storage, name1);
            const storageRef = ref(storage, 'images/' + imgName);
            const uploadTask = uploadBytesResumable(storageRef, file);
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
                        await addDoc(collection(db, "Team"), {
                            Name: name,
                            Post: post,
                            imgTeam:  downloadURL,
                            Facebook : fb,
                            Instagram : insta,
                            Twitter: twitter,
                            LinkedIn : linkedin
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
                            <FloatingLabel controlId="floatingPassword" label="Position">
                                    <Form.Control required type="text" placeholder="Position" name="post" value={post} onChange={e=>setPost(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingLinkedIn" label="LinkedIn">
                                <Form.Control required type="text" placeholder="LinkedIn" name="linkedin" value={linkedin} onChange={e=>setLinkedin(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingFb" label="Facebook">
                                <Form.Control required type="text" placeholder="Facebook" name="facebook" value={fb} onChange={e=>setFb(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInsta" label="Instagram">
                                <Form.Control required type="text" placeholder="Instagram" name="insta" value={insta} onChange={e=>setInsta(e.target.value)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingTwitter" label="Twitter">
                                <Form.Control required type="text" placeholder="Twitter" name="twitter" value={twitter} onChange={e=>setTwitter(e.target.value)} />
                            </FloatingLabel>

                            <Form.Group className="mb-3" id="formImage" style={{width: '86%'}}>
                                <Form.Label>Image</Form.Label>
                                <Form.Control required type="file" name="image"  onChange={e=>setFile(e.target.files[0])} />
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
export default AddTeam;