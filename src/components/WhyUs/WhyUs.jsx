import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import Header from "../Header/Header";
import {Link, useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";
import {whyusColumns} from './whyusTableSource';

const WhyUs = () => {

    const [info , setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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

    const handleUpdate = (data) => {
        navigate('/WhyUs/Update', {state: data})
    }

    const actionColumn = [
        {
            //field: "action",
            name: "Action",
            width: 200,
            cell: (params) => {
                return (
                    <div className="cellAction">
                        {/*<Link to="/AddTeam" style={{ textDecoration: "none" }}>*/}
                        {/*    <div className="viewButton"*/}
                        {/*         // onClick={()=> handleDelete(params.row.id)}*/}
                        {/*    >Update</div>*/}
                        {/*</Link>*/}
                        <div className="viewButton"
                             onClick={()=> handleUpdate(params)}
                        >Update</div>
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
                            <Link to="/WhyUs/Add" className="link">
                                Add New
                            </Link>
                        </div>
                        <DataTable
                            title="WhyUs Section"
                            data={info}
                            columns={whyusColumns.concat(actionColumn)}
                        />
                    </div>
                </>)}
        </div>
    );
}

export default WhyUs