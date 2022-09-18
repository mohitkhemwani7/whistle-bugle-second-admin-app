import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db, storage} from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Header from "../Header/Header";
import {Col, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {DataGrid} from "@mui/x-data-grid";
import {subServiceColumns} from "./subServiceTableSource";

const UpdateServices =  () => {
    const location = useLocation();
    const  [name, setName] = useState(location.state?.Name? location.state?.Name : "");
    const [img, setImg] = useState({});
    const [url, setUrl] = useState(location.state?.Image? location.state?.Image : "" );
    const [percentage, setPercentage] = useState(null);
    const [vector, setVector] = useState(location.state?.Vector? location.state?.Vector : "" );
    const [description, setDescription] = useState(location.state?.Description? location.state?.Description : "" );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [info , setInfo] = useState([]);
    useEffect( ()=>{
        const Fetchdata = async () => {
            setLoading(true);
            let list = [];
            const querySnapshot = await getDocs(collection(db, "services/" + location.state.id + '/SubServices'));
            querySnapshot.forEach(doc => {
                list.push({id: doc.id, ...doc.data()});
            });
            setInfo(list);
            setLoading(false);
        };
        Fetchdata();

    }, [])

    const handleDeleteSubService = async (id) => {
        try {
            await deleteDoc(doc(db, "services/" + location.state.id + '/SubServices' , id));
            setInfo(info.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {/*<Link to="/AddTeam" style={{ textDecoration: "none" }}>*/}
                        <div className="viewButton"
                             //onClick={()=> handleUpdate(params.row)}
                        >Update</div>
                        {/*</Link>*/}
                        <div
                            className="deleteButton"
                            onClick={() => handleDeleteSubService(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    const handleUpdate = async () => {
        if(img.name !== undefined){
            await handleFileUpdate();
        }
        else {
            const docRef = doc(db, "services", location.state.id);
            setLoading(true);
            await updateDoc(docRef, {
                Name: name,
                Description: description,
                Vector: vector
            });
            setLoading(false);
            navigate('/Services')
        }

    }

    const handleFileUpdate = async () => {
        try {
            setLoading(true);
            const imgName = new Date().getTime() + img.name;
            //const storageRef = ref(storage, name1);
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
                        setUrl(downloadURL);
                        const docRef = doc(db, "services", location.state.id);
                        await updateDoc(docRef, {
                            Name: name,
                            Description: description,
                            Image:  downloadURL,
                            Vector: vector
                        });
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
                                <Form onSubmit={handleUpdate}>
                                    <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                        <Form.Control required type="text"  placeholder="Name" name="name" value={name} onChange={e=>setName(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingDescription" label="Description">
                                        <Form.Control required type="text" placeholder="Description" name="description" value={description} onChange={e=>setDescription(e.target.value)} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingVector" label="Vector">
                                        <Form.Control required type="text" placeholder="Vector" name="linkedin" value={vector} onChange={e=>setVector(e.target.value)} />
                                    </FloatingLabel>
                                    <Form.Group>
                                        <img src={url} width="300" height="300"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" id="formImage" style={{width: '86%'}}>
                                        <Form.Label>Choose New Image</Form.Label>
                                        <Form.Control type="file" name="image"  onChange={e=>setImg(e.target.files[0])} />
                                    </Form.Group>
                                    <div style={{textAlign: "center"}}>
                                        <Button variant="primary" type="submit" disabled={percentage !== null && percentage<100}>
                                            Update
                                        </Button>
                                    </div>

                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>

                    <div className="datatable">
                        <div className="datatableTitle">
                            {/*<Link to="/SubServices/Add" className="link">*/}
                            {/*    Add New*/}
                            {/*</Link>*/}
                            <Button onClick={()=>{
                                navigate('/SubServices/Add', {state: location.state.id})
                            }}>Add New SubService</Button>
                        </div>
                        <DataGrid
                            className="datagrid"
                            rows={info}
                            columns={subServiceColumns.concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                        />
                    </div>

                </>)}
        </div>
    )
}
export default UpdateServices;