import { Calendar, Month } from "@mantine/dates";
import styles from "../styles/CalendarMaint.module.css";
import { Button, Center, Group, Indicator, Stack } from '@mantine/core';
import { useState, useEffect } from "react";
import api from '../services/api'

const CalendarM = () => {
  const [value, setValue] = useState(null);
  const [arrayDevices, setArrayDevices] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDevices = await api.devicesList(1);
    setArrayDevices(listDevices.data)
  }




  var devicesList = arrayDevices.map((d) => {
    return d.attributes
  });

  var devicesListDate = arrayDevices.map((d)=>{
    const maintDay = d.attributes.maintenance?.data?.attributes?.next_maintenance
    return maintDay
  })

  const diaNuevo = "2023,10,10"
  const dia = "5"
  const mes = "01"
  const anio = "2023"
  return (
    <div className={styles.calendarContainer}>
    <Calendar
    amountOfMonths={1}
      fullWidth
      excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
      
      renderDay={(date) => {

        const day = date.getDate();
        return (
          <>
          <Indicator size={6} color="red" offset={8} disabled={day != dia}>
            <div>{day}</div>
          </Indicator>
         </>
          
        );
      }}
      size="xl"
      styles={(theme) => ({
        cell: {
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        },
        
        day: { borderRadius: 0, height: 90, fontSize: theme.fontSizes.xs },
        weekday: { fontSize: theme.fontSizes.lg },
        weekdayCell: {
          fontSize: theme.fontSizes.xl,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[0],
          border: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
          height: 70,
        }
      })}
      value={value}
      onChange={setValue}
    />

    
    <br/>
    <p>{devicesListDate}</p>

    </div>
  );
}
export default CalendarM;
