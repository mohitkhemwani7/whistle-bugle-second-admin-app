import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {whyusColumns} from './whyusTableSource';

const WhyUs = () => {

    const [info , setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect( ()=>{
        const Fetchdata = async () => {
            setLoading(true);
            let list = [];
            const querySnapshot = await getDocs(collection(db, "whyus"));
            querySnapshot.forEach(doc => {
                list.push({id: doc.id, ...doc.data()});
            });
            setInfo(list);
            setLoading(false);
        };
        Fetchdata();

    }, [])


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

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {/*<Link to="/AddTeam" style={{ textDecoration: "none" }}>*/}
                        {/*    <div className="viewButton"*/}
                        {/*         // onClick={()=> handleDelete(params.row.id)}*/}
                        {/*    >Update</div>*/}
                        {/*</Link>*/}
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
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
                            <Link to="/WhyUs/Add" className="link">
                                Add New
                            </Link>
                        </div>
                        <DataGrid
                            className="datagrid"
                            rows={info}
                            columns={whyusColumns.concat(actionColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            localeText={{}}
                        />
                    </div>
                </>)}
        </div>
    );
}

export default WhyUs