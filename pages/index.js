import React from "react";
import Login from "../components/Login";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import TableDevices from "../components/TableDevices";
import NotAuthenticated from "./auth/not-authenticated";
import { Button, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import axios from "axios";
import Stats from "../components/Stats";

const Home = () => {
  /*const { data: session } = useSession();*/
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      <TableDevices/> 
     {/*  <h1>{session ? "" : ""}</h1>

      {session && <TableDevices />}
      {session ? " " : <NotAuthenticated />} */}
      {/* <Stats/> */}
    </div>
  );
};

export default Home;
