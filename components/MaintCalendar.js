import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import { Container, Text } from "@mantine/core";
import styles from '../styles/MaintCalendar.module.css'
const MaintCalendar = () => {
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setarrayDataDev(list.data.concat(list2.data));
  }
  return (
    <>
    <Container className={styles}>
      <FullCalendar
        locale={esLocale}
        updateSize
        weekends={false}
        selectable={true}
        footerToolbar
        eventColor="#022b4a"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        
        events={arrayDevices.map((f) => {
          return {
            title: f.attributes.device_id,
            date: f.attributes.maintenance?.data?.attributes?.next_maintenance,
          };
        })}
      />
      </Container>
    </>
  );
};

export default MaintCalendar;
