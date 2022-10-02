import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useContext, useEffect, useState} from "react";
import {authStore} from "../stores/authStore";
import {NextRouter, useRouter} from "next/router";
import {userService} from "../services";



const Home: JSX.Element = () => {
  const {state, dispatch} = useContext(authStore)

  return (
      <>{state.data.authenticated ? 'Authenticated' : 'Unauthenticated'}</>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Home'
    },
  };
}

export default Home
