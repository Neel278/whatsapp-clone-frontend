import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import instance from "./Axios/Axios";
import Chat from "./Chat/Chat";
import { actionTypes } from "./ContextAPI/reducer";
import { useStateValue } from "./ContextAPI/StateProvider";
import Sidebar from "./Sidebar/Sidebar";
import UserAuth from "./UserAuth/UserAuth";

function App() {
	const [{ user }, dispatch] = useStateValue(); // at the end set it up on reducer not state
	// const [loggedInUser, setLoggedInUser] = useState(user);

	async function getUserLoggedIn() {
		try {
			if (!user) {
				const response = await instance.get("/api/checkLoginStatus");
				const userId = response?.data?.userId;
				if (userId) dispatch({ type: actionTypes.SET_USER, user: userId });
			}
		} catch (error) {
			// console.log(error);
		}
	}

	useEffect(() => {
		getUserLoggedIn();
	});

	// console.log(user);
	return (
		<div className="app">
			<div className="app__container">
				{!user ? (
					<UserAuth />
				) : (
					<BrowserRouter>
						<Sidebar />
						<Switch>
							<Route path="/rooms/:roomId" exact>
								<Chat />
							</Route>
							<Route path="/" exact>
								{/* <Chat /> */}
							</Route>
						</Switch>
					</BrowserRouter>
				)}
			</div>
		</div>
	);
}

export default App;
