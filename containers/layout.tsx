import { ReactNode, useContext } from "react";
import { userService } from "../services";
import { authStore } from "../stores/authStore";
import Auth from "./auth";
import Default from "./auth/Default";

const Layout: ({ children }: { children: ReactNode }) => JSX.Element = ({
  children,
}) => {
  const { state, dispatch } = useContext(authStore);
  const logout = () => {
    userService.logout().then(() => {
      dispatch({ type: "logout" });
    });
  };
  const illustration = "/assets/img/auth/auth.png";
  return (
    <>
      {state.data.authenticated && (
        <button onClick={() => logout()}>Logout</button>
      )}
      {!state.data.authenticated && (
        <Default illustrationBackground={illustration} image={illustration}>
          {children}
        </Default>
      )}
      {state.data.authenticated && <div>{children}</div>}
    </>
  );
};

export default Layout;
