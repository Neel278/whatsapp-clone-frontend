import React from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import "./UserAuth.css";

export default function UserAuth() {
	return (
		<div className="userauth">
			<Login />
			<Signup />
		</div>
	);
}
