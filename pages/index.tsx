import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useContext, useEffect, useState } from "react";
import { authStore } from "../stores/authStore";
import Link from "next/link";
import { userService } from "../services";

const Home: NextPage<{}> = () => {
  const { state, dispatch } = useContext(authStore);
  const user = userService.userValue;
  console.log(user);
  return (
    <>
      {state.data.authenticated
        ? `${user?.fullName} - ${user?.email}`
        : "Unauthenticated"}
      {!state.data.authenticated && <Link href={"/login"}>Login</Link>}
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  };
}

export default Home;
