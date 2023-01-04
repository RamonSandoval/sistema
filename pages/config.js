import React from "react";
import Layout from "../components/Layout";
import TableSort from "../components/TableSort";
import { Button, Modal, Select, Text } from "@mantine/core";
import styles from "../styles/Config.module.css";
import { useState, useEffect } from "react";
import api from "../services/api";
import Notifications from "../components/Notifications";
import { Tabs, Table, ActionIcon, Center } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconPin,
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons";
import ModalAddDepartment from "../components/modals/ModalAddDepartment";
import UsersList from "../components/UsersList";
import ModalEditDeparment from "../components/modals/ModalEditDeparment";
const config = () => {
  const [arrayDep, setarrayDep] = useState([]);
  const [opened, setOpened] = useState();
  const [departmentToDelete, setDepartmentToDelete] = useState({});
  const [opened3, setOpened3] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [departmentToEdit,setDepartmentToEdit] = useState({})

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
  }
  async function deleteDepartment(id) {
    try {
      await api.deleteDepartment(id);
      Notifications.success("Se ha eliminado el departamento correctamente ");
      init();
    } catch (error) {
      Notifications.error("Error al eliminar el departamento");
      console.error(error);
    }
  }
  /*LISTS*/
  var departmentsListSelect = arrayDep.map((d) => {
    return d.attributes.department_name;
  });
  return (
    <>
      <Layout tituloPagina="Configuracion" />
      <div className={styles.mainContainer}>
        <Tabs defaultValue="users" className={styles.tabsContainer}>
          <Tabs.List>
            <Tabs.Tab value="users" icon={<IconUsers size={14} />}>
              Usuarios
            </Tabs.Tab>
            <Tabs.Tab value="departments" icon={<IconPin size={14} />}>
              Departamentos
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="users" pt="xs">
            <UsersList />
          </Tabs.Panel>

          <Tabs.Panel value="departments" pt="xs">
            <div className={styles.iconContainer}>
              <ActionIcon
                onClick={() => setOpened(true)}
                className={styles.add__icon}
                variant="filled"
              >
                <IconPlus size={30} />
              </ActionIcon>
            </div>
            <Table highlightOnHover>
              <thead>
                <tr className={styles.table__titles}>
                  <th>
                    <Center>ID</Center>
                  </th>
                  <th>
                    <Center>Departamento</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {arrayDep &&
                  arrayDep.map((data) => (
                    <tr key={data.department_name}>
                      <td>
                        <Center>{data.id}</Center>
                      </td>
                      <td>
                        <Center>{data.attributes.department_name}</Center>
                      </td>
                      <td>
                        <Center>
                          <div className={styles.icons}>
                            <ActionIcon color="indigo" onClick={() => {setOpened2(true); setDepartmentToEdit(data)}}>
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
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar departamento"
      >
        <ModalAddDepartment />
      </Modal>

      {departmentToEdit && (
        <Modal
          title={"Editar Departamento " + departmentToEdit.id}
          opened={opened2}
          onClose={() => setOpened2(false)}
        >
          <ModalEditDeparment departmentToEdit={{ ...departmentToEdit }} />
        </Modal>
      )}
      <Modal
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={
          <Text size="lg">Seguro que desea eliminar el Departamento?</Text>
        }
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              deleteDepartment(departmentToDelete).then(() => setOpened3(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default config;
