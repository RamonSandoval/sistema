import React from "react";
import Notifications from "../components/Notifications";
import stylesModal from "../styles/ModalRegisterNewMaint.module.css";
import ModalMaintHistory from "../components/modals/ModalMaintHistory";
import {
  Modal,
  Table,
  Divider,
  ThemeIcon,
  TextInput,
  Text,
  Button,
  ScrollArea,
} from "@mantine/core";
import { Center } from "@mantine/core";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Inventory.module.css";
import { ActionIcon } from "@mantine/core";
import {
  IconEdit,
  IconHistory,
  IconList,
  IconPlus,
  IconSearch,
  IconTools,
  IconTrash,
} from "@tabler/icons";
import ModalAddDevice from "../components/modals/ModalAddDevice";
import api from "../services/api";
import ModalEditDevice from "../components/modals/ModalEditDevice";
import ModalCreateMaint from "../components/modals/ModalCreateMaint";
import ModalAddDeviceSteps from "../components/modals/ModalAddDeviceSteps";

const inventory = () => {
  const [opened, setOpened] = useState();
  const [deviceToDelete, setDeviceToDelete] = useState({});
  const [deviceToEdit, setDeviceToEdit] = useState({});
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [search, setSearch] = useState("");
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [deviceToMaint, setDeviceToMaint] = useState({});
  const [deviceToMaintNew, setDeviceToMaintNew] = useState({});

  const [openedMaint, setOpenedMaint] = useState(false);
  const [openedMaintNew, setOpenedMaintNew] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setarrayDataDev(list.data.concat(list2.data));
  }

  const closeModal = () => {
    setOpened(false);
    init();
  };

  const closeModal2 = () => {
    setOpened2(false);
    init();
  };

  new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (search) => {
    var resultado = arrayDataDev.filter((elemento) => {
      if (
        elemento.attributes.device_id
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        elemento.attributes.department?.data?.attributes.department_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        elemento.attributes.model
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return elemento;
      }
    });
    setarrayDevices(resultado);
  };

  /**
   * The function deleteDevice() is an async function that takes an id as a parameter. It then calls
   * the api.deleteDevice() function, which returns a promise. If the promise is resolved, the function
   * displays an alert and calls the init() function. If the promise is rejected, the function displays
   * an alert and logs the error to the console.
   *
   * @param id The id of the device to delete.
   */
  async function deleteDevice(id) {
    try {
      await api.deleteDevice(id);
      Notifications.success("Se ha eliminado el dispositivo correctamente ");
      init();
    } catch (error) {
      Notifications.error("Error al eliminar el dispositivo" + id);
      console.error(error);
    }
  }

  /*LISTS*/
  var devicesListSelect = arrayDataDev.map((d) => {
    return d.attributes.device_id;
  });

  return (
    <>
      <Layout tituloPagina="Inventario" />
      <Center>
        <div className={styles.table}>
          <div className={styles.table__title}>
            <div className={styles.table__title2}>
              <ThemeIcon
                className={styles.icon}
                color="#002A5B"
                variant="transparent"
              >
                <IconList />
              </ThemeIcon>
              <h3>Inventario</h3>
            </div>

            <TextInput
              placeholder="Buscar"
              value={search}
              onChange={handleChange}
              icon={<IconSearch />}
            />

            <ActionIcon
              onClick={() => setOpened(true)}
              className={styles.add__icon}
              variant="filled"
            >
              <IconPlus size={30} />
            </ActionIcon>
          </div>
          <Divider variant="dashed" size="sm" my="sm" />
          <div className={styles.tableContainer}>
            <ScrollArea>
              <Table highlightOnHover>
                <thead>
                  <tr className={styles.table__titles}>
                    <th>
                      <Center>#</Center>
                    </th>
                    <th>
                      <Center>ID Equipo</Center>
                    </th>
                    <th>
                      <Center>Departamento / Area</Center>
                    </th>
                    <th>
                      <Center>Modelo</Center>
                    </th>
                    <th>
                      <Center>Acciones</Center>
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {arrayDevices &&
                    arrayDevices.map((data) => (
                      <tr key={data.device_id}>
                        <td>
                          <Center>{data.id}</Center>
                        </td>
                        <td>
                          <Center>{data.attributes.device_id}</Center>
                        </td>
                        <td>
                          <Center>
                            {
                              data.attributes.department?.data?.attributes
                                .department_name
                            }
                            {data.attributes.production?.data?.attributes.name}
                          </Center>
                        </td>
                        <td>
                          <Center>{data.attributes.model}</Center>
                        </td>
                        <td>
                          <Center>
                            <div className={styles.icons}>
                              <ActionIcon
                                color="yellow"
                                onClick={() => {
                                  setOpenedMaint(true);
                                  setDeviceToMaint(data);
                                }}
                              >
                                <IconHistory size={18} />
                              </ActionIcon>
                              <ActionIcon
                                color="pink"
                                onClick={() => {
                                  setOpenedMaintNew(true);
                                  setDeviceToMaintNew(data);
                                }}
                              >
                                <IconTools size={18} />
                              </ActionIcon>
                              <ActionIcon
                                color="indigo"
                                onClick={() => {
                                  setDeviceToEdit(data);
                                  setOpened2(true);
                                  console.log(data);
                                }}
                              >
                                <IconEdit size={18} />
                              </ActionIcon>
                              <ActionIcon
                                color="red"
                                onClick={() => {
                                  setOpened3(true);
                                  setDeviceToDelete(data.id);
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
            </ScrollArea>
          </div>
        </div>
      </Center>

      {/*-----------------MODAL's ADD AND EDIT DEVICES--------------*/}
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar dispositivos"
      >

        {/* <ModalAddDeviceSteps/> */}
        <ModalAddDevice closeModal={closeModal} />
      </Modal>

      {deviceToEdit && (
        <Modal
          title={"Editar dispositivo"}
          opened={opened2}
          onClose={() => setOpened2(false)}
        >
          <ModalEditDevice closeModal2={closeModal2} deviceToEdit={{ ...deviceToEdit }} />
        </Modal>
      )}
      {/*-----------------MODAL's CONFIRMATIONS--------------*/}
      <Modal
        centered
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size="lg">Seguro que desea eliminar el Dispositivo?</Text>}
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              deleteDevice(deviceToDelete).then(() => setOpened3(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
      {deviceToMaint && (
        <Modal
          className={stylesModal.modal__container}
          transition="fade"
          size={850}
          transitionDuration={400}
          transitionTimingFunction="ease"
          opened={openedMaint}
          onClose={() => setOpenedMaint(false)}
          title={"Historial de Mantenimiento Previo"}
        >
          <hr />
          <ModalMaintHistory deviceToMaint={{ ...deviceToMaint }} />
        </Modal>
      )}

      {deviceToMaintNew && (
        <Modal
          className={stylesModal.modal__container}
          transition="fade"
          size={850}
          transitionDuration={400}
          transitionTimingFunction="ease"
          opened={openedMaintNew}
          onClose={() => setOpenedMaintNew(false)}
          title={"Crear Nuevo Mantenimiento"}
        >
          <hr />
          <ModalCreateMaint deviceToMaintNew={{ ...deviceToMaintNew }} />
        </Modal>
      )}
    </>
  );
};

export default inventory;
