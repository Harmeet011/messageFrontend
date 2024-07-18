import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../Constants";
import { useNavigate } from "react-router";
import localStorageService from "../LocalStorageService";
import { Button, Spinner } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login_status, setLogin_status] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function usernameHandler(e) {
    setUsername(e.target.value);
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
  }

  function login() {
    setLoading(true);
    let data = JSON.stringify({
      username: username,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: BaseUrl + "chat/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        localStorageService.set("auth-token", response.data.token);
        setLogin_status("Login Success!");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setLogin_status("Username or Password is wrong!");
      });
  }

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="App">
      <h1>login page</h1>
      <p>
        Username{" "}
        <input id={"username"} type={"text"} onChange={usernameHandler} />
      </p>
      <p>
        Password{" "}
        <input id={"password"} type={"password"} onChange={passwordHandler} />
      </p>
      <p>
        <Button className="btn btn-primary" id={"loginbtn"} onClick={login}>
          Login
          {loading && (
            <Spinner
              className="ms-2"
              animation="border"
              role="status"
              size="sm"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </Button>
      </p>
      <p>
        <Button
          className="btn btn-secondary"
          id={"registerbtn"}
          onClick={register}
        >
          Register
        </Button>
      </p>
      <p id={"login_status"}>{login_status}</p>
    </div>
  );
}

export default Login;
