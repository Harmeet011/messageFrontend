import React, {useEffect, useState} from 'react';
import {BaseUrl} from "../Constants";
import axios from "axios";
import localStorageService from "../LocalStorageService";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router";


function CreateChatroom(props) {
    const [users, setUsers] = useState([])
    const [selectedMembers, setSelectedMembers] = useState([])
    const token = localStorageService.get("auth-token")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
useEffect(() => {
      let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl+"chat/users/",
            headers: {
                'Authorization': `token ${token}`,
            }
        };

        axios.request(config)
            .then((response) => {
                setUsers((response.data));
            })
            .catch((error) => {
                console.log(error);
            });
},[])

    const handleAdd = () => {
        setLoading(true);
        let name = document.getElementById("name").value
        let created_by = document.getElementById("created_by").value
        let data = JSON.stringify({
            "name": name,
            "created_by": created_by,
            "members": selectedMembers
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl+"chat/chatroom/",
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                setLoading(false);
                navigate("/chatroom")
                // console.log(JSON.stringify(response.data)); add navigate to chatrrom
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }

    const handleMemberSelection = (e) => {
        const selectedOptions = e.target.selectedOptions
        const selectedValues = []
        for (let i = 0; i < selectedOptions.length; i++) {
            selectedValues.push(selectedOptions[i].value)
        }
        setSelectedMembers(selectedValues)
    }


return (
    <div>
        <h1>Create Chatroom</h1>
        <p>Name: <input id="name" type={"text"}/></p>
        <p>Created by: <select id="created_by" >
            {users?.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}

        </select></p>
        <p>Members: <select id="members" multiple={true} value={selectedMembers} onChange={handleMemberSelection}>
            {users?.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
        </select></p>
        <p><button id="submit" onClick={handleAdd}>Add
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
        </button></p>
    </div>
);
}

export default CreateChatroom;