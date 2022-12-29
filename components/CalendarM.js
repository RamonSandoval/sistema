import { useState } from "react";
import { Calendar } from "@mantine/dates";
import styles from "../styles/CalendarMaint.module.css";
function CalendarM() {
  const [value, setValue] = useState(null);
  return (
    <div className={styles.calendarContainer}>
    <Calendar
      fullWidth
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
        },
      })}
      value={value}
      onChange={setValue}
    />
    </div>
  );
}
export default CalendarM;
