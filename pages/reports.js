import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from '@mantine/core';
import styles from '../styles/Tabs.module.css'
import { IconCalendarEvent,IconBuilding, IconStatusChange, IconTool } from '@tabler/icons';
import DepartmentAreaStats from '../components/Lists/DepartmentAreaStats'
import { signOut, useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import SignIn from "./auth/sign-in";


const reports = () => {

  const { data: session } = useSession();
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
    init();
  }, [session]);

  return (
    <>
    <h1>{session ? "" : <SignIn/>}</h1>    
    <Layout tituloPagina="Reportes"/>
    
    {session && (
    <Tabs defaultValue="mantMes" className={styles.tabs__container}>
      <Tabs.List>
        <Tabs.Tab icon={<IconCalendarEvent size={14} />} value="mantMes">
          Mantenimientos por Mes
        </Tabs.Tab>
      
        <Tabs.Tab icon={<IconBuilding size={14} />} value="mantDep">
          Equipos por Departamento / Area
        </Tabs.Tab>

        

        <Tabs.Tab icon={<IconStatusChange size={14} />} value="quality">
          Calidad de Atencion
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel pt={20} value="mantMes">Por mes</Tabs.Panel>
      <Tabs.Panel pt={20} value="mantDep">
        <DepartmentAreaStats/>
      </Tabs.Panel>
      <Tabs.Panel pt={20} value="quality">Calidad</Tabs.Panel>
    </Tabs>
    )}
    </>
    
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: true,
      },
    };
  }
  return {
    props: {
    },
  };
};

export default reports