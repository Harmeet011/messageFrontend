import React, {useState} from 'react';
import axios from "axios";
import { BaseUrl } from '../Constants';
import { useNavigate } from 'react-router';
import localStorageService from "../LocalStorageService";

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register_status, setRegister_status] = useState("")
    const navigate = useNavigate()

    function usernameHandler(e) {
        setUsername(e.target.value)
    }

    function emailHandler(e) {
        setEmail(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function register() {
        let data = JSON.stringify({
            "username": username,
            "password": password,
            "email": email
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + 'chat/register/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                localStorageService.set("auth-token", response.data.token)
                setRegister_status("New User Registered!")
                navigate("/")
            })
            .catch((error) => {
                setRegister_status("Please provide the correct details!")
            });
    }

    return (
        <div>
            <h1>Register page</h1>
            <p>Username <input id={"username"} type={'text'} onChange={usernameHandler}/></p>
            <p>Email <input id={"email"} type={'email'} onChange={emailHandler}/></p>
            <p>Password <input id={"password"} type={'password'} onChange={passwordHandler}/></p>
            <p>
                <button id={"registerbtn"} onClick={register}>Register</button>
            </p>
            <p id={'register_status'}>{register_status}</p>
        </div>
    );
}

export default Register;