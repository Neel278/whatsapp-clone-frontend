import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ModalComponent from "../ModalComponent/ModalComponent";
import "./SidebarChat.css";

export default function SidebarChat({ addNewRoom, room }) {
	return !addNewRoom ? (
		<Link to={`/rooms/${room._id}`} className="sidebarChat__link">
			<div className="sidebarChat">
				<Avatar />
				<div className="sidebarChat__right">
					<h2>{room.name}</h2>
					<p>last message</p>
				</div>
			</div>
		</Link>
	) : (
		<div className="sidebarChat">
			<ModalComponent />
		</div>
	);
}
