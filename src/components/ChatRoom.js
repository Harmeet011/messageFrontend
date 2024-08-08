import { useEffect, useState } from "react";
import { BaseUrl } from "../Constants";
import axios from "axios";
import localStorageService from "../LocalStorageService";
import Table from "react-bootstrap/Table";
import { Spinner, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ChatRoom() {
  const [chatrooms, setChatrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const navigate = useNavigate();

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
      method: "get",
      maxBodyLength: Infinity,
      url: BaseUrl + "chat/users/",
      headers: {
        Authorization: `token ${token}`,
      },
    };

    axios
      .request(userConfig)
      .then((response) => {
        const tempUser = {};
        response.data.forEach((user) => {
          tempUser[user.id] = user.username;
        });
        setUsers(tempUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    setDeletedId(id);
    setIsDeleting(true);
    const token = localStorageService.get("auth-token");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: BaseUrl + "chat/chatroom/" + id + "/",
      headers: {
        Authorization: `token ${token}`,
      },
    };
    axios
      .request(config)
      .then(() => {
        setShowToast(true);
        setIsDeleting(false);
        const newChatrooms = chatrooms.filter((chatroom) => chatroom.id !== id);
        setChatrooms(newChatrooms);
      })
      .catch((error) => {
        setIsDeleting(false);
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-between align-items-center mt-4 mb-4">
        <div className="col-auto">
          <h2>Chat Rooms</h2>
        </div>
        <div className="col-auto">
          <Button
            className="btn btn-primary"
            id="addChatroomBtn"
            onClick={() => navigate("/createChatroom")}
          >
            Create Chatroom
          </Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Chatroom Name</th>
            <th>Chatroom Members</th>
            <th>Created By</th>
            <th>Actions</th>
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
              <td>
                {chatroom.members.map((member) => users[member]).join(", ")}
              </td>
              <td>{users[chatroom.created_by]}</td>
              <td>
                <button
                  id="deleteChatroomBtn"
                  onClick={() => handleDelete(chatroom.id)}
                  className="btn"
                >
                  {isDeleting && deletedId === chatroom.id ? (
                    <Spinner
                      className="ms-2"
                      animation="border"
                      role="status"
                      size="sm"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <TrashIcon
                      style={{ color: "red", height: "20px", width: "20px" }}
                    />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer className="toast-container-fixed">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          bg="success"
          autohide
        >
          <Toast.Body className="text-white">
            <CheckCircleIcon
              style={{ height: "20px", width: "20px", marginRight: "5px" }}
            />
            Chatroom deleted successfully
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
