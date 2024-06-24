import { useEffect, useState } from "react"
import { BaseUrl } from "../Constants";
import axios from "axios";

export default function ChatRoom(){
    const [chatrooms, setChatrooms] = useState([]);

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