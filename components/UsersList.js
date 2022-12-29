import { ActionIcon, Button, Center, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React from "react";
import styles from "../styles/UserList.module.css";
import { useState, useEffect } from "react";
import api from "../services/api";
const UsersList = () => {
  const [arrayUsers, setarrayUsers] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listUsers = await api.usersList(1);
    setarrayUsers(listUsers.data);
  }
  return (
    <>
      <Table highlightOnHover>
        <thead>
          <tr className={styles.table__titles}>
            <th>
              <Center>ID</Center>
            </th>
            <th>
              <Center>Usuario</Center>
            </th>
            <th>
              <Center>Correo</Center>
            </th>
            <th>
              <Center>Permisos</Center>
            </th>
            <th>
              <Center>Estatus</Center>
            </th>
            <th>
              <Center>Acciones</Center>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {arrayUsers &&
            arrayUsers.map((data) => (
              <tr key={data.id}>
                <td>
                  <Center>{data.id}</Center>
                </td>
                <td>
                  <Center>{data.username}</Center>
                </td>
                <td>
                  <Center>{data.email}</Center>
                </td>
                <td>
                  <Center>admin</Center>
                </td>
                <td>
                  <Center>{data.confirmed}</Center>
                </td>
                <td>
                  <Center>
                    <div className={styles.icons}>
                      <ActionIcon color="indigo" onClick={() => {}}>
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          setOpened3(true);
                          setDepartmentToDelete(data.id);
                        }}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </div>
                  </Center>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
