import { useEffect, useState } from "react";
import { BaseUrl } from "../Constants";
import axios from "axios";
import localStorageService from "../LocalStorageService";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";

export default function ChatRoom() {
  const [chatrooms, setChatrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
        setChatrooms(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

      let userConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: BaseUrl + 'chat/users/',
        headers: { 
            Authorization: `token ${token}`,
        }
      };
      
      axios.request(userConfig)
      .then((response) => {
        const tempUser = {}
        response.data.forEach((user) => {
          tempUser[user.id] = user.username
        })
        setUsers(tempUser)
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
            <th>Chatroom Members</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="4">
                {" "}
                <Spinner
                  className="ms-2"
                  animation="border"
                  role="status"
                  size="sm"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                Loading...
              </td>
            </tr>
          )}
          {chatrooms.map((chatroom) => (
            <tr key={chatroom.id}>
              <td>{chatroom.id}</td>
              <td>{chatroom.name}</td>
              <td>{chatroom.members.map((member) => users[member]).join(", ")}</td>
              <td>{users[chatroom.created_by]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}