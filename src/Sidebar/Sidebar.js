import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";
import axios from "../Axios/Axios";
import Pusher from "pusher-js";

export default function Sidebar() {
	const [rooms, setRooms] = useState([]);

	function getAllRooms() {
		axios.get("/api/room/getAllRooms").then((response) => {
			setRooms(response.data);
		});
	}

	useEffect(() => {
		getAllRooms();
	}, []);

	useEffect(() => {
		const pusher = new Pusher(process.env.REACT_APP_PUSHER_SECRET, {
			cluster: "ap2",
		});

		const channel1 = pusher.subscribe("room");
		channel1.bind("inserted", function (newRoom) {
			setRooms([...rooms, newRoom]);
		});

		return () => {
			channel1.unbind_all();
			channel1.unsubscribe();
		};
	}, [rooms]);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLarge />
					</IconButton>
					<IconButton>
						<Chat />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input type="text" placeholder="Search or start new conversation" />
				</div>
			</div>
			<div className="sidebar__body">
				<SidebarChat addNewRoom />
				{rooms.map((room, i) => (
					<SidebarChat room={room} key={i} />
				))}
			</div>
		</div>
	);
}
