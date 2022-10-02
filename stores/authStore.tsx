import React, {useReducer, createContext, ReactNode, ReducerState, Reducer} from "react";
import {userService} from "../services";

const initialState: {state: State, dispatch: (p: { type: string }) => void} = {};
const authStore = createContext(initialState);
const { Provider } = authStore;

const authInitializer = initialState => {
    return {isLoading: initialState, authenticated: initialState};
};

type Action =
    | { type: 'login' }
    | { type: 'logout' }
    | { type: 'failure' };

type State = {
    data: { authenticated: boolean };
    isLoading: boolean;
    error?: string;
}

const AuthProvider = ({ children }: { children?: ReactNode }) => {
    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case "login":
                return { data: {authenticated: true}, isLoading: false }; // {} is the newState
            case "logout":
                return { data: {authenticated: false}, isLoading: false }; // {} is the newState
            default:
                throw new Error()
        }
    }
    console.log(!!userService.userValue)
    const [state, dispatch] = useReducer(reducer, !!userService.userValue, (x): State => {console.log(x);return { data: {authenticated: x}, isLoading: false }});

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { authStore, AuthProvider };
