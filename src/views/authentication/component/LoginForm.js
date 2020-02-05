import React, {useState} from 'react';

import { useAuthState, useAuthDispatch, attemptSignIn } from "../../../contexts/AuthProvider";

const LoginForm = (props) => {
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [userType, setUserType] = useState()

	const dispatch = useAuthDispatch()

	async function handleSignIn(e) {
		e.preventDefault();

		navigator.geolocation.getCurrentPosition(position => {
			const loginInfo = {
				username,
				password,
				type: userType,
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			try {
				attemptSignIn(dispatch, loginInfo, props)
			} catch (error) {
					alert(error.message)
			}
		});
	};
	return ( 
		<form onSubmit={handleSignIn}>
			<select id="userType" onChange={(e)=>setUserType(e.target.value)}>
				<option value=""> Select... </option>
				<option value="Dashboard"> Dispatch </option>
				<option value="Technician"> Technician </option>
			</select>
			<input id="username" type="text" placeholder="enter you username" onChange={(e)=>setUsername(e.target.value)}/>
			<input id="password" type="password" placeholder="enter password" onChange={(e)=> setPassword(e.target.value)}/>
			<input type="submit" value="Login" />
		</form>
	);
}

export { LoginForm };