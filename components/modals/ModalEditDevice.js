import React from "react";
import { Button, TextInput, Center, Select } from "@mantine/core";
import { IconClipboardList, IconId, IconPin } from "@tabler/icons";
import api from "../../services/api";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import Notifications from "../Notifications";
const ModalEditDevice = ({deviceToEdit,closeModal2}) => {
  
  const [arrayDep, setarrayDep] = useState([]);
  const id_edit = deviceToEdit.id
  const id_edit_department = deviceToEdit.attributes?.department?.data?.id

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
  }
  async function updateDevice() {
    const body = {
      data: {
        device_id: form.values.device_id,
        model: form.values.model,
        department_name: form.values.department_name
      }
    }
    try {
      await api.updateDevice(id_edit,body);
      Notifications.success("Se ha editado el dispositivo correcatamente");
      console.log(id_edit_department)
    }
     catch (error) {
      Notifications.error("Erro al editar el dispositivo");
      console.log(error);
    }
  }

  const form = useForm({
    initialValues:{
        device_id: deviceToEdit.attributes.device_id,
        department_name: deviceToEdit.attributes?.department?.data?.attributes.department_name,
        model: deviceToEdit.attributes.model
    },
    validate: {
      /* device_id: (value) => 
      value.length === 0 ? "Escriba el ID del Dispositivo" : null, */
    },
  });

  var departmentsListSelect = arrayDep.map((d) => {
    return d.attributes.department_name;
  });

  return (
    <>
      <form onSubmit={form.onSubmit(updateDevice)}>
        <TextInput
          readOnly
          label="ID del Dispositivo"
          {...form.getInputProps("device_id")}
          icon={<IconId />}
        />

      <Select
      label="Departamento / Area"
      icon={<IconPin />}
      searchable
      {...form.getInputProps("department_name")}
      data={departmentsListSelect}
      />

        <TextInput pb={20}
           label="Modelo" 
           {...form.getInputProps("model")}
           icon={<IconClipboardList />} />
        <Center>
          <Button color="#002a5b" type="submit">
            {" "}
            Aplicar {" "}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default ModalEditDevice;
