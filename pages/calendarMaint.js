import { Center } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/CalendarMaint.module.css";
import { useState } from "react";
import MaintCalendar from "../components/MaintCalendar";
const CalendarMaint = () => {
  return (
    <>
      <Layout tituloPagina="Calendario" />
      <Center>
    <MaintCalendar/>
      </Center>
    </>
  );
};

export default CalendarMaint;
