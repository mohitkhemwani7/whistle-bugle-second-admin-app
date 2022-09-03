import React, {useEffect, useState} from "react";
import { addDoc, collection } from "firebase/firestore";
import {db, storage} from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddTeam =  () => {

    const  [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [file, setFile] = useState({});
    const [url, setUrl] = useState("");
    const [percentage, setPercentage] = useState(null);
    useEffect( () =>{
        const uploadFile = () =>{
            const imgName = new Date().getTime() + file.name;
            //const storageRef = ref(storage, name1);
            const storageRef = ref(storage, 'images/' + imgName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPercentage(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL);
                    });
                }
            );


        };
        file.name && uploadFile();

        }, [file]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "Team"), {
                Name: name,
                Post: post,
                ImageUrl: url
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return(
        <>
            <form name="form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email">Name</label><br/>
                    <input type="text" className="form-control" name="name"
                           value={name} id="login"
                           onChange={e=>setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Post</label>
                    <input type="text" className="form-control" name="post" value={post} onChange={e=>setPost(e.target.value)}/>
                    <input disabled={percentage!=null && percentage<100} type="submit" className="fadeIn fourth" value="Submit"/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Image</label>
                    <input type="file" name="image"  onChange={e=>setFile(e.target.files[0])}/>
                </div>
            </form>
        </>
    )
}
export default AddTeam;