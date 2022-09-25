import React, {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import Header from "../Header/Header";
import {Link, useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";
import {serviceColumns} from "./servicetableSource";

const Services = () => {
    const navigate = useNavigate();
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


    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "services", id));
            setInfo(info.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (data) => {
        //db.collection("users").doc(doc.id).update({foo: "bar"});
        navigate('/Services/Update', {state: data})
    }

    const actionColumn = [
        {
            //field: "action",
            name: "Action",
            width: "200px",
            cell: (params) => {
                return (
                    <div className="cellAction">
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
                            <Link to="/Services/Add" className="link">
                                Add New
                            </Link>
                        </div>
                        <DataTable
                            data={info}
                            columns={serviceColumns.concat(actionColumn)}
                        />
                    </div>
                </>)}
        </div>

    );
}

export default Services