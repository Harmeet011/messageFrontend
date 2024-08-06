import { useEffect, useState } from "react";
import { BaseUrl } from "../Constants";
import axios from "axios";
import localStorageService from "../LocalStorageService";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorageService.get("auth-token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: BaseUrl + "chat/users/",
      headers: {
        Authorization: `token ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
       <div class="row justify-content-between align-items-center mt-4 mb-4">
            <div class="col-auto">
                <h2>Users</h2>
            </div>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && (
            <tr>
              <td colSpan="4">
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
