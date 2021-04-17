import React, { useState } from "react";
import "./Login.css";
import axios from "../../Axios/Axios";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { actionTypes } from "../../ContextAPI/reducer";

export default function Login() {
	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");

	const [, dispatch] = useStateValue();

	const logInUser = async () => {
		try {
			const response = await axios.post("/api/login", {
				mobile,
				password,
			});
			dispatch({
				type: actionTypes.SET_USER,
				user: response.data.userId,
			});
		} catch (error) {
			console.log(error);
		}
		setMobile("");
		setPassword("");
	};

	return (
		<div className="login">
			<div className="login__container">
				<div className="login__header">
					<h1>Login</h1>
				</div>
				<div className="login__form">
					<input
						type="text"
						placeholder="Enter Your mobile number"
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Enter Your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit" onClick={logInUser}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
