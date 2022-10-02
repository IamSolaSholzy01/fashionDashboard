import {ReactNode, useContext} from "react";
import {userService} from "../services";
import {authStore} from "../stores/authStore";

const Layout: JSX.Element = ({children}:{children: ReactNode}) => {
    const {state, dispatch} = useContext(authStore)
    const logout = () => {
        userService.logout().then(()=>{
            dispatch({type: 'logout'})
        })
    }
  return <>
      {state.data.authenticated && <button onClick={()=>logout()}>Logout</button>}
        {children}
    </>
}

export default Layout