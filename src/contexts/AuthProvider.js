import React, { createContext, useReducer } from 'react';
import { API_HOST_HTTP, API_HOST_WS } from "../config.js";
import $ from "jquery";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

function AuthProvider ({children}) {
  const [state, dispatch] = useReducer(AuthReducer, {})

  return ( 
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function AuthReducer(state, action) {
  console.log('adf', state, action);
  switch (action.type) {
    case 'signin success':
      return {user: action.userInfo};
  
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}
 
export { AuthProvider, useAuthState, useAuthDispatch, attemptSignIn };

function attemptSignIn(dispatch, loginInfo, props) {
  const { history } = props
  return new Promise((res, rej) => {
    $.ajax({
      url: `${API_HOST_HTTP}/login`,
      type: "POST",
      data: loginInfo,
      success: data => {
        const { username, type, id } = data;
        if (data) {
          const userInfo = {
            username,
            login: true,
            type,
            id,
            isLoggedin: true,
          };
          //dispatch to update user profile
          dispatch({type: 'signin success', userInfo})
          // props.history.push(`/${userInfo.type}`);
          history.push('/')
          res(userInfo)
        } else {
          rej("Username or Password does not exist");
        }
      },
      error: function(data) {
        rej('ERROR', data);
      }
    });
  })
}