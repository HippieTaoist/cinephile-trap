import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import FirstNameHooks from "../../hooks/FirstNameHooks";
import LastNameHooks from "../../hooks/LastNameHooks";
import UsernameHooks from "../../hooks/UsernameHooks";
import PasswordHooks from "../../hooks/PasswordHooks";
import EmailHooks from "../../hooks/EmailHooks";
import CheckToken from "../../hooks/CheckToken";

import "./SignUp.css";

export default function SignUp() {
  let jwtToken = window.localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const [
    firstName,
    handleFirstNameOnChange,
    firstNameError,
    firstNameSetOnFocus,
    firstNameSetOnBlur,
  ] = FirstNameHooks();

  const [
    lastName,
    handleLastNameOnChange,
    error,
    lastNameSetOnFocus,
    lastNameSetOnBlur,
  ] = LastNameHooks();

  const [
    username,
    handleUsernameOnChange,
    usernameError,
    usernameSetOnFocus,
    usernameSetOnBlur,
  ] = UsernameHooks();

  const [
    email,
    handleEmailOnChange,
    emailError,
    emailSetOnFocus,
    emailSetOnBlur,
  ] = EmailHooks();

  const [
    password,
    handlePasswordOnChange,
    passwordError,
    passwordSetOnFocus,
    passwordSetOnBlur,
  ] = PasswordHooks();

  //////////////////////////HANDLESUBMIT/////////////////
  async function handleSubmit(e) {
    console.log(e);
    e.preventDefault();

    console.log(firstName, lastName, username, email, password);

    try {
      let payload = await axios.post(
        "http://localhost:3001/api/users/create-user",
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      );

      console.log(payload);
      toast.success("Congrats!! Now Go Login!");
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
      toast.error(e.response.data.message);
    }
  }

  if (firstNameError) {
    toast.error(`First Name Problems: ${firstNameError}`);
  }
  if (error) {
    toast.error(`Last Name Problems: ${error}`);
  }
  if (usernameError) {
    toast.error(`Username Problems: ${usernameError}`);
  }
  if (emailError) {
    toast.error(`Email Problems: ${emailError}`);
  }
  if (passwordError) {
    toast.error(`Password Problems: ${passwordError}`);
  }

  const { checkJwtToken } = CheckToken();

  useEffect(() => {
    if (checkJwtToken()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="form-div-signin">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <span>Please Sign Up...</span>

          <div className="form-floating">
            {/* First Name Input */}
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              value={firstName}
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name Here"
              onChange={handleFirstNameOnChange}
              onFocus={firstNameSetOnFocus}
              onBlur={firstNameSetOnBlur}
            />
          </div>

          <div className="form-floating">
            <label htmlFor="lastName">Last Name</label>
            {/* Last Name Input */}
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name Here"
              onChange={handleLastNameOnChange}
              onFocus={lastNameSetOnFocus}
              onBlur={lastNameSetOnBlur}
            />
          </div>

          <div className="form-floating">
            {/* Username Input */}
            <input
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="Username Here"
              onChange={handleUsernameOnChange}
              onFocus={usernameSetOnFocus}
              onBlur={usernameSetOnBlur}
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="form-floating">
            {/* Email Input */}
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="Email Here"
              onChange={handleEmailOnChange}
              onFocus={emailSetOnFocus}
              onBlur={emailSetOnBlur}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating">
            {/* Password Input */}
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password Here"
              onChange={handlePasswordOnChange}
              onFocus={passwordSetOnFocus}
              onBlur={passwordSetOnBlur}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Submit Button for Form */}
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onSubmit={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
}
