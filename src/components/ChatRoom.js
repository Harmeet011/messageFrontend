import { useEffect, useState } from "react";
import { BaseUrl } from "../Constants";
import axios from "axios";
import localStorageService from "../LocalStorageService";
import Table from "react-bootstrap/Table";

export default function ChatRoom() {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const token = localStorageService.get("auth-token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: BaseUrl + "chat/chatroom",
      headers: {
        Authorization: `token ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Chatroom Name</th>
            <th>Members</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {chatrooms.map((chatroom) => (
            <tr key={chatroom.id}>
              <td>{chatroom.id}</td>
              <td>{chatroom.name}</td>
              <td>{chatroom.members}</td>
              <td>{chatroom.created_by}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}