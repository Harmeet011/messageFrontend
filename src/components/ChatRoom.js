import React, { useEffect, useState } from "react"
import { BaseUrl } from "../Constants";
import axios from "axios";
import {Button, Spinner} from "react-bootstrap";
import {useNavigate} from "react-router";

export default function ChatRoom(){
    const [chatrooms, setChatrooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: BaseUrl + "chat/chatroom",
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            setChatrooms(response.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])

    return (
        <div>
            <h2>Chat Room</h2>
             <Button className="btn btn-primary" id={"addChatRoomBtn"} onClick={() => navigate("/createChatroom")}>
          Create ChatRoom
        </Button>
            <h3>Test</h3>
            <ul>
                {chatrooms.map((chatroom) => 
                    <li key={chatroom.id}>
                        {chatroom.name}
                    </li>
                )}
            </ul>
        </div>
    )
}