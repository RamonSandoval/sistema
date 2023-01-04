import { Center } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/CalendarMaint.module.css";
import CalendarM from "../components/CalendarM.js";
import CalendarAnt from '../components/CalendarAnt'
import { useState } from "react";
const CalendarMaint = () => {
  return (
    <>
      <Layout tituloPagina="Calendario" />
      <Center>
      {/*<CalendarM/>*/}
      <CalendarAnt/>
      </Center>
    </>
  );
};

export default CalendarMaint;
