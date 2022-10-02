import LoginForm from "../components/LoginForm";
import {useContext} from "react";
import {authStore} from "../stores/authStore";

const Login = () => {
    const {state} = useContext(authStore)
    return (
        <>
            <LoginForm />
            {state.data.authenticated ? 'Authenticated' : 'Unauthenticated'}
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            title: 'Login'
        },
    };
}

export default Login