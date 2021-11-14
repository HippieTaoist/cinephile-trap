import React, { useState, useEffect } from "react";

import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckToken from "../../hooks/CheckToken";

import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { checkJwtToken } = CheckToken();
  useEffect(() => {
    if (checkJwtToken()) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload = await axios.post(
        "http://localhost:3001/api/users/login-user",
        {
          email,
          //   username,
          password,
        }
      );

      window.localStorage.setItem("jwtToken", payload.data.payload);

      let decodedToken = jwtDecode(payload.data.payload);

      setUsername({
        email: decodedToken.email,
        username: decodedToken.username,
      });

      toast.success(`Congrats! You are not logged in ${username}!`);

      navigate("/protected-home");
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data);
    }
  }

  return (
    <>
      <div className="form-div-signin">
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
            <div className="form-floating">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* PASSWORD INPUT */}
            <div className="form-floating">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password here"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* SUBMIT BUTTON */};
            <div className="form-floating">
              <button
                type="submit"
                className="w--100 btn btn-lg btn-secondary"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
