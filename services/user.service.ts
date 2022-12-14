import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user")!)
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue(): {
    access_token: string;
    user_id: string;
    roles: string[];
    email: string;
    fullName: string;
    name: {
      first: string;
      last: string;
    };
  } {
    return userSubject.value;
  },
  login,
  logout,
  getAll,
};

function login(email: string, password: string) {
  return fetchWrapper
    .post(`${baseUrl}/auth/login`, { email, password })
    .then((user) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

// async function login(email: string, password: string) {
//   const user = {email, password}
//   userSubject.next(user);
//   localStorage.setItem("user", JSON.stringify(user));
//
//   return user;
// }

async function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  return Router.push("/login");
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
