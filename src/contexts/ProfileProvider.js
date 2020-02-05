import React, { createContext, useReducer } from 'react';

const ProfileStateContext = createContext();
const ProfileDispatchContext = createContext();

function ProfileProvider ({children}) {
  const [state, dispatch] = useReducer(ProfileReducer, {})

  return ( 
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
}

function ProfileReducer(state, action) {
  switch (action.type) {
    case 'update profile':
      console.log('action', action)
			return {userInfo: action.userinfo}

    default:
    	throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useProfileState() {
  const context = React.useContext(ProfileStateContext)
  if (context === undefined) {
    throw new Error('useProfileState must be used within a ProfileProvider')
  }
  return context
}
function useProfileDispatch() {
  const context = React.useContext(ProfileDispatchContext)
  if (context === undefined) {
    throw new Error('useProfileDispatch must be used within a ProfileProvider')
  }
  return context
}
 
export { ProfileProvider, useProfileState, useProfileDispatch };
