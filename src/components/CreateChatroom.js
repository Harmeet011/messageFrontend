import React, {useEffect, useState} from 'react';
import {BaseUrl} from "../Constants";
import axios from "axios";

function CreateChatroom(props) {
    const [users, setUsers] = useState([])

useEffect(() => {
      let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl+"chat/users/",
            headers: {
                'Authorization': 'token d3e47a7b4f84ce3d4c7ea397ce118e801a0f0588'
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
        let name = document.getElementById("name").value
        let created_by = document.getElementById("created_by").value
        let members = document.getElementById("members").value
        let data = JSON.stringify({
            "name": name,
            "created_by": created_by,
            "members": [members]
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl+"chat/chatroom/",
            headers: {
                'Authorization': 'token d3e47a7b4f84ce3d4c7ea397ce118e801a0f0588',
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

return (
    <div>
        <h1>Create Chatroom</h1>
        <p>Name: <input id="name" type={"text"}/></p>
        <p>Created by: <select id="created_by" >
            {users?.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}

        </select></p>
        <p>Members: <select id="members" multiple={true}>
            {users?.map((user) => <option key={user.id} value={user.id}>{user.username}</option>)}
        </select></p>
        <p><button id="submit" onClick={handleAdd}>Add</button></p>
    </div>
);
}

export default CreateChatroom;