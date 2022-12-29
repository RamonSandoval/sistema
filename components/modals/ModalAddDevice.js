import React from "react";
import { Button, TextInput, Center, Select } from "@mantine/core";
import api from "../../services/api";
import { useState, useEffect } from "react";
import { IconClipboardList, IconId, IconPin } from "@tabler/icons";
import { useForm } from "@mantine/form";
import Notifications from "../Notifications";
const ModalAddDevice = ({ closeModal}) => {
  const [arrayDep, setarrayDep] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
  }

  /*LISTS*/
  var departmentsListSelect = arrayDep.map((d) => {
    return d.attributes.department_name;
  });
  /**
   * It creates a device with the data from the form.
   * </code>
   */
  async function createDevice() {
    const body = {
      data: {
        device_id: form.values.device_id,
        model: form.values.model,
        department_name: form.values.department_name,
      },
    };
    try {
      await api.addDevice(body);
      Notifications.success("Se ha agregado el dispositivo Correctamente");
      init();
      closeModal();
    } catch (error) {
      Notifications.error("El dispositivo ya se encuentra registrado");
      console.error(error);
    }
  }

  const form = useForm({
    initialValues: {
      device_id: "",
      model: "",
      department_name: "",
    },
    validate: {
      device_id: (value) =>
        value.length === 0 ? "Ingrese el Identificador del Dispositivo" : null,
      department_name: (value) =>
        value.length === 0
          ? "Ingrese el departamento donde se encuentra el dispositivo"
          : null,
      model: (value) =>
        value.length === 0 ? "Ingrese el modelo o marca del dispositivo" : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit(createDevice)}>
      <TextInput
        label="ID del Dispositivo"
        placeholder="IT10XXX"
        icon={<IconId />}
        {...form.getInputProps("device_id")}
      />
      <Select
      label="Departamento / Area"
      icon={<IconPin />}
      searchable
      {...form.getInputProps("department_name")}
      data={departmentsListSelect}
      />
      <TextInput
        pb={20}
        label="Modelo"
        placeholder=""
        icon={<IconClipboardList />}
        {...form.getInputProps("model")}
      />
      <Center>
        <Button color="#002a5b" type="submit">
          Agregar
        </Button>
      </Center>
    </form>
  );
};

export default ModalAddDevice;
