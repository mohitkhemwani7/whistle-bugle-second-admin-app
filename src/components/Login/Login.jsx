import React, {useContext} from 'react';
import './login.css'
import {auth} from '../../firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, Navigate} from 'react-router-dom'
import {useState} from "react";
import {Nav} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext";


function Login() {
    const  [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const error = useState(null);
    const navigate = useNavigate();
    const submitted = useState(true);
    const [loading, setLoading] = useState(false);

    const {dispatch} = useContext(AuthContext);



    const handleLogin = (e) =>{
        e.preventDefault();
        setLoading(true);
        //const history = createBrowserHistory();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                //history.push('/main');
                dispatch({type:"LOGIN", payload: user});
                setLoading(false);
                navigate('/main');
            })
            .catch((error) => {
                setLoading(false);
                this.setState({error: error});
            });
    }


        return(
            <div>
            {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
            <>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h2 className="active"> Sign In </h2>
                        <form name="form" onSubmit={handleLogin}>
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label><br/>
                                <input type="text" className="form-control fadeIn second" name="email"
                                       value={email} id="login"
                                       onChange={e=>setEmail(e.target.value)}
                                       />
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control fadeIn second" name="password"
                                       value={password} id="password"
                                       onChange={e=>setPassword(e.target.value)} />

                                <input type="submit" className="fadeIn fourth" value="Log In"/>
                            </div>
                        </form>
                    </div>
                </div>
            </>)}
            </div>
        )
}

export default Login;