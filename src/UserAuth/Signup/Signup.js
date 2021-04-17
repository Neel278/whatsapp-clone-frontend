import React, { useState } from "react";
import "./Signup.css";
import axios from "../../Axios/Axios";
import { useStateValue } from "../../ContextAPI/StateProvider";
import { actionTypes } from "../../ContextAPI/reducer";

export default function Signup() {
	const [mobile, setMobile] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");

	const [, dispatch] = useStateValue();

	const createNewUser = async () => {
		try {
			const response = await axios.post("/api/signup", {
				mobile,
				password,
				verifyPassword,
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
		setVerifyPassword("");
	};

	return (
		<div className="signup">
			<div className="signup__container">
				<div className="signup__header">
					<h1>Signup</h1>
				</div>
				<div className="signup__form">
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
					<input
						type="text"
						placeholder="Verify Your password"
						value={verifyPassword}
						onChange={(e) => setVerifyPassword(e.target.value)}
					/>
					<button type="submit" onClick={createNewUser}>
						Signup
					</button>
				</div>
			</div>
		</div>
	);
}
