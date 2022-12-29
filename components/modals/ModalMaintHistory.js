import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Radio,
  Textarea,
  Button,
} from "@mantine/core";
import {Fecha} from '../../helpers'
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import api from "../../services/api";
import Notifications from "../Notifications";

const ModalMaintHistory = ({deviceToMaint}) => {
  const [opened, setOpened] = useState(false);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev,setArrayDataDev] = useState([]);
  const id_maint = deviceToMaint.attributes?.maintenance?.data?.id
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setArrayDataDev(list.data.concat(list2.data));

  }

  var devicesListSelect = arrayDataDev.map((d) => {
    return d.attributes.device_id;
  });

  async function updateMaintenance(){
    const body = {
      data:{
        motive: form.values.motive,
        user_request: form.values.user_request,
        user_maintenance: form.values.user_maintenance,
        maintenance_type: form.values.maintenance_type,
        notes: form.values.notes,
        maintenance_date: form.values.maintenance_date,
        next_maintenance: form.values.next_maintenance,
        maintenance_eval: form.values.maintenance_eval,
        maintenance_type_next: form.values.maintenance_type_next,
        user_request_name: form.values.user_request_name
      }
    }
    try{
      await api.updateMaintenance(id_maint,body)
      Notifications.success("Se ha realizado el mantenimiento con exito");
    }catch(error){
      Notifications.error("Error al realizar el Mantenimiento");
      console.log(error)
    }
  }

  const form = useForm({
    initialValues:{
      device_id: deviceToMaint.attributes.device_id,
      department_name: deviceToMaint.attributes?.department?.data?.attributes.department_name,
      model: deviceToMaint.attributes.model,
      maintenance_type:deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_type,
      motive: deviceToMaint.attributes?.maintenance?.data?.attributes.motive,
      user_request: deviceToMaint.attributes?.maintenance?.data?.attributes.user_request,
      notes: deviceToMaint.attributes?.maintenance?.data?.attributes.notes,
      maintenance_date: Fecha(deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_date),
      next_maintenance: deviceToMaint.attributes?.maintenance?.data?.attributes.next_maintenance,
      maintenance_eval: deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_eval,
      maintenance_type_next: deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_type_next,
      user_request_name: deviceToMaint.attributes?.maintenance?.data?.attributes.user_request_name
    },
    validate:{

    }

  })

  
  return (
    <form onSubmit={form.onSubmit(updateMaintenance)}>
    <div className={stylesModal.modal__container}>
      <div className={stylesModal.modal__lcontainer}>
        <TextInput
        disabled
        searchable
        limit={8}
        label="ID Equipo"
        {...form.getInputProps("device_id")}
        withAsterisk />

        <TextInput 
        disabled
        placeholder="HP-X" 
        label="Modelo"
        {...form.getInputProps("model")}
        />

        <TextInput
        disabled
        label="Departamento / Area" 
        {...form.getInputProps("department_name")}
        />
        <TextInput
        disabled
        label="Tipo de mantenimiento anterior"
        {...form.getInputProps("maintenance_type")}
        />

        <TextInput
          label="Motivo de Mantenimiento"
          {...form.getInputProps("motive")}
          data={[
            
          ]}
        />
        <Radio.Group
        
          label="Solicito Usuario?"
          {...form.getInputProps("user_request".valueOf(Radio))}
        >
          <Radio  value="yes" label="Si" />
          <Radio value="no" label="No" />
        </Radio.Group>

        <div className={stylesModal.modal__solicitant}>
          <Select
            label="Departamento / Area"
            placeholder=" - "
            data={[
              
            ]}
            {...form.getInputProps("department")}
          />
          <TextInput
            className={stylesModal.input__name}
            label="Nombre"
            {...form.getInputProps("user_request_name")}
          />
          
        </div>
        

        
      </div>

      <div className={stylesModal.modal__rcontainer}>
        <Textarea 
        label="Notas"
        {...form.getInputProps("notes")}
        withAsterisk />
        <DatePicker
          allowFreeInput
          placeholder="Elegir fecha"
          label="Mantenimiento Realizado el: "
          withAsterisk
          {...form.getInputProps("maintenance_date")}
        />
        <Select
        label="Tipo de Mantenimiento proximo"
        clearable
        data={['Interno','Externo','Interno/Externo']}
        {...form.getInputProps("maintenance_type_next")}
        />
        {/* <Checkbox.Group
          
          label="Tipo de Mantenimiento proximo"
          withAsterisk
          {...form.getInputProps("maintenance_type_next".toString())}
        >
          <Checkbox value="Interno" label="Interno" />
          <Checkbox value="Externo" label="Externo" />
          <Checkbox value="Interno/Externo" label="Interno/Externo" />
        </Checkbox.Group> */}
        <DatePicker
          allowFreeInput
          placeholder="Elegir fecha"
          label="Proximo Mantenimiento "
          {...form.getInputProps("next_maintenance")}
          withAsterisk
        />
        <Radio.Group
          name="tiempo"
          label="Se atendio en tiempo y forma?"
          {...form.getInputProps("maintenance_eval".valueOf(Radio))}
          withAsterisk
        >
          <Radio value="yes" label="Si" />
          <Radio value="no" label="No"/>
        </Radio.Group>
        <Select
          label="Realizo Manteniemiento"
          placeholder=" - "
          {...form.getInputProps("user_maintenance")}
          data={[
            
          ]}
        />
        <div className={stylesModal.button}>
          <Button color="orange" type="submit">
          {" "}
          Registrar{" "}
          
          </Button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default ModalMaintHistory;
