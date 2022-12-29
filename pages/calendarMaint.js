import { Center } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/CalendarMaint.module.css";
import CalendarM from "../components/CalendarM.js"
import { useState } from "react";
const CalendarMaint = () => {
  const [value, setValue] = useState(null);
  return (
    <>
      <Layout tituloPagina="Calendario" />
      <Center>
       <CalendarM/>
      </Center>
    </>
  );
};

export default CalendarMaint;
