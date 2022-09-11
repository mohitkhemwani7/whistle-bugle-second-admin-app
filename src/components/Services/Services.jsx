import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

const Services = () => {

    const [info , setInfo] = useState([]);
    //const [lcollection , setLcollection] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect( ()=>{
        const Fetchdata = async () => {
            setLoading(true);
            let list = [];
            const querySnapshot = await getDocs(collection(db, "services"));
            querySnapshot.forEach(doc => {
                list.push({id: doc.id, ...doc.data()});
            });
            setInfo(list);
            setLoading(false);
        };
        Fetchdata();

    }, [])

    // const FetchCollection = async (id) => {
    //     setLoading(true);
    //     let collectionList = [];
    //     const querySnapshot = await getDocs(collection(db, "services" + id + "SubServices"));
    //     querySnapshot.forEach(doc => {
    //         collectionList.push({id: doc.id, ...doc.data()});
    //     });
    //     setLcollection(collectionList);
    //     setLoading(false);
    // };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "whyus", id));
            setInfo(info.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (id) => {
        db.collection("users").doc(doc.id).update({foo: "bar"});
    }

        return (
        <div>

            {
                info.map((e) => (
                    <Container >
                        <Frame description={e.Description} imgSource={e.Image}
                               name={e.Name} vector={e.Vector}
                               />
                    </Container>
                ))
            }
        </div>

    );
}

const Frame = ({name , description, vector, imgSource}) => {
    const [lcollection , setLcollection] = useState([]);

    useEffect( ()=>{
        const FetchCollection = async () => {
            let list = [];
            const querySnapshot = await getDocs(collection(db, "services/" + name + "/SubServices"));
            querySnapshot.forEach(doc => {
                list.push({id: doc.id, ...doc.data()});
            });
            setLcollection(list);
        };
        FetchCollection();

    }, [])
    return (
        <div>
            <Row xs="auto">
                <Col>
                    {imgSource}
                </Col>
                <Col>{name}</Col>
                <Col>{description}</Col>
                <Col>{vector}</Col>
            </Row>
            <div>
                {
                    lcollection.map((e) => (
                        <Container>
                            <SubServices description={e.Description} imgSource={e.Image}
                                   name={e.Name}
                            />
                        </Container>
                    ))
                }
            </div>
        </div>

    );
}


const SubServices = ({name , description, imgSource}) => {
    return (
        <Row xs="auto">
            <Col>
                {imgSource}
            </Col>
            <Col>{name}</Col>
            <Col>{description}</Col>
        </Row>
    );
}

export default Services