import React from "react";
import { Button, TextInput, Center } from "@mantine/core";
import { IconClipboardList, IconId, IconPin } from "@tabler/icons";
import api from "../../services/api";
import { useForm } from "@mantine/form";
import Notifications from "../Notifications";
import { useState, useEffect } from "react";

const ModalEditDevice = ({deviceToEdit,closeModal2}) => {

  const id_edit = deviceToEdit.id

  useEffect(() => {
    init();
  }, []);

  async function init() {
    
  }
  
  async function updateDevice() {
    const body = {
      data: {
        device_id: form.values.device_id,
        department_name: form.values.department_name,
        model: form.values.model
      }
    }
    try {
      await api.updateDevice(id_edit,body);
      Notifications.success("Se ha editado el dispositivo correcatamente");
      closeModal2();
      init();
      
      
    } catch (error) {
      Notifications.error("Error al editar el dispositivo");
      console.log(error);
    }
  }

  function test(){
    console.log(id_edit)
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

  return (
    <>
      <form onSubmit={form.onSubmit(updateDevice)}>
        <TextInput
          disabled
          label="ID del Dispositivo"
          {...form.getInputProps("device_id")}
          icon={<IconId />}
        />

        <TextInput 
          label="Departamento / Area" 
          icon={<IconPin />}
          {...form.getInputProps("department_name")}
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
