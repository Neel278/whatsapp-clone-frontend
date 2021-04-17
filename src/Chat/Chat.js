import { Avatar, IconButton } from "@material-ui/core";
import {
	AttachFile,
	EmojiEmotionsOutlined,
	Mic,
	MoreVert,
	Search,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import axios from "../Axios/Axios";
import { useStateValue } from "../ContextAPI/StateProvider";
import Pusher from "pusher-js";

export default function Chat() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [{ user }] = useStateValue();
	const { roomId } = useParams();
	// console.log(roomId);

	useEffect(() => {
		axios.get(`/api/chat/getAllMessages/${roomId}`).then((response) => {
			setMessages(response.data);
		});
	}, [roomId]);

	useEffect(() => {
		const pusher = new Pusher(process.env.REACT_APP_PUSHER_SECRET, {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("message");
		channel.bind("inserted", function (message) {
			setMessages([...messages, message]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	const sendNewMessge = async (e) => {
		e.preventDefault();
		// Store message in the db and show it off
		const response = await axios.post("/api/chat/addNewMessage", {
			roomId: roomId,
			message: input,
		});
		// console.log(response.data);
		setMessages([...messages, response.data]);
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__roomInfo">
					<h2>Room Name</h2>
					<p>last seen at ...</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<Search />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message, i) => (
					<p
						className={`chat__message ${
							message.senderId === user && "chat__receiver"
						}`}
						key={i}
					>
						{message.message}
						<span className="chat__timestamp">
							{new Date(message.timestamp).toUTCString()}
						</span>
					</p>
				))}
				{/* 	<p className="chat__message chat__receiver">
					<span className="chat__userName">Coll</span>
					Hello neel
					<span className="chat__timestamp">{new Date().toUTCString()}</span>
				</p> */}
			</div>
			<div className="chat__footer">
				<EmojiEmotionsOutlined />
				<form>
					<input
						type="text"
						placeholder="Type a message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button type="submit" onClick={sendNewMessge}>
						Send
					</button>
				</form>
				<Mic />
			</div>
		</div>
	);
}
