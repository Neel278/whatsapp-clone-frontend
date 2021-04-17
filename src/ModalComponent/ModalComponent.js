import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@material-ui/core";
import "./ModalComponent.css";
import axios from "../Axios/Axios";

export default function ModalComponent() {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [mobile, setMobile] = useState("");

	async function createNewRoom() {
		setShow(false);
		// show model and then take room details and members name
		// Then store those details from backend
		await axios.post("/api/room/createRoom", {
			roomName: name,
			createdFor: mobile,
		});
		// console.log(response.data);

		// clear the input for better user experience
		setName("");
		setMobile("");
	}
	const handleDialog = () => {
		setShow(!show);
	};
	return (
		<div className="modalComponent">
			<Button onClick={handleDialog}>
				<h2>Add New Room</h2>
			</Button>
			<Dialog open={show} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add New Room</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create new room please enter the name of the user and mobile
						number.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Room Name"
						type="text"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						margin="dense"
						id="mobile"
						label="User Mobile No."
						type="number"
						fullWidth
						value={mobile}
						onChange={(e) => setMobile(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={createNewRoom} color="primary">
						Add room
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
