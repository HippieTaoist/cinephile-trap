import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ user, setUser }) {
  let linkTitle1 = user ? user.username : "Sign-Up Today";
  let link1 = user ? "/profile" : "/sign-up";

  let linkTitle2 = user ? "Log-Out" : "Sign-In";
  let link2 = user ? "/" : "/sign-in";

  let logOutButton = user ? logOut : () => {};

  function logOut() {
    setUser(null);
    window.localStorage.removeItem("jwtTowken");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            Cinephile Trap
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={link1} className="nav-link" aria-current="page">
                  {linkTitle1}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={link2}
                  className="nav-link "
                  onClick={() => logOutButton()}
                >
                  {linkTitle2}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
