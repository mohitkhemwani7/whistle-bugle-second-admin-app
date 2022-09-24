import React, {useEffect} from "react";
import {db} from '../../firebase';
import { useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import "./team.css";
import  DataGrid  from "react-data-grid";
import { userColumns } from "../../datatableource";
import DataTable from "react-data-table-component";
import 'react-data-grid/lib/styles.css';
// import 'react-data-grid/lib'
// import * as ReactDataGridPlugins from 'react-data-grid/addons';
import {Link, useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import '../Main/main.css';

const Team = () => {

    const [info , setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect( ()=>{

        const Fetchdata = async () => {
            setLoading(true);
            let list = [];
            const querySnapshot = await getDocs(collection(db, "Team"));
            querySnapshot.forEach(doc => {
                list.push({id: doc.id, ...doc.data()});
            });
            setInfo(list);
            setLoading(false);
        };
        Fetchdata();

    }, [])



//     return (
//         <div>
//             <center>
//                 <h2>Team Members</h2>
//             </center>
//
//             {
//                 info.map((e) => (
//                     <Container>
//                         <Frame name={e.Name} post={e.Post}
//                                fb={e.Facebook} insta={e.Instagram}
//                                 linkedin={e.LinkedIn} twitter={e.Twitter}
//                                 imgSource={e.imgTeam}/>
//                     </Container>
//                 ))
//             }
//         </div>
//
//     );
// }
//
// // Define how each display entry will be structured
// const Frame = ({name , post, fb, insta, linkedin, twitter, imgSource}) => {
//     console.log("Hello" + name + " " + post + " " + linkedin);
//     return (
//         <Row xs="auto">
//             <Col>
//                 <img src={imgSource} style={{width: "50px"}}/>
//             </Col>
//             <Col>{name}</Col>
//             <Col>{post}</Col>
//             <Col>{insta}</Col>
//             <Col>{fb}</Col>
//             <Col>{twitter}</Col>
//             <Col>{linkedin}</Col>
//         </Row>
//     );
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "Team", id));
            setInfo(info.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (data) => {
        navigate('/UpdateTeam', {state: data})
        //db.collection("users").doc(doc.id).update({foo: "bar"});
    }

    const actionColumn = [
        {
            //key: "action",
            name: "Actions",
            width: 10,
            cell: (params) => {
                return (
                    <div className="cellAction">
                        {/*<Link to="/AddTeam" style={{ textDecoration: "none" }}>*/}
                            <div className="viewButton"
                                 onClick={()=> handleUpdate(params)}
                            >Update</div>
                        {/*</Link>*/}
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"/>
                </div>
            ) : (

                <>
            <Header/>
            <div className="datatable">
                <div className="datatableTitle">
                    <Link to="/AddTeam" className="link">
                        Add New
                    </Link>
                    {/*<div onClick={()=>{*/}
                    {/*    navigate('/AddTeam');*/}
                    {/*}}>Add Team</div>*/}
                </div>
                <DataTable
                    //rowKeyGetter={(row) => row.id || ''}
                    //className="datagrid"
                    title="Team Members"
                    data={info}
                    columns={userColumns.concat(actionColumn)}
                    //pageSize={9}
                    //rowsPerPageOptions={[9]}

                />
            </div>
        </>)}
        </div>
    );
}

export default Team;