import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Radio,
  Textarea,
  Button,
  Checkbox,
} from "@mantine/core";
import {Fecha2} from '../../helpers'
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import api from "../../services/api";
import Notifications from "../Notifications";

const ModalMaintHistory = ({deviceToMaint}) => {
  const [opened, setOpened] = useState(false);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev,setArrayDataDev] = useState([]);
  const id_maint = deviceToMaint?.attributes?.maintenance?.data?.id
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
      maintenance_date: Fecha2(deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_date),
      next_maintenance: Fecha2(deviceToMaint.attributes?.maintenance?.data?.attributes.next_maintenance),
      maintenance_eval: deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_eval,
      maintenance_type_next: deviceToMaint.attributes?.maintenance?.data?.attributes.maintenance_type_next,
      user_request_name: deviceToMaint.attributes?.maintenance?.data?.attributes.user_request_name,
      user_request_department: deviceToMaint.attributes?.maintenance?.data?.attributes.user_request_department,
      user_maintenance: deviceToMaint.attributes?.maintenance?.data?.attributes.user_maintenance
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
        />

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
        readOnly
        label="Tipo de mantenimiento previo realizado"
        {...form.getInputProps("maintenance_type")}
        />

        <TextInput
        readOnly
          label="Motivo de Mantenimiento"
          {...form.getInputProps("motive")}
          data={[
            
          ]}
        />

        <Checkbox.Group
        disabled
        label="Solicitio Usuario?"
        >
        <Checkbox readOnly disabled value="yes"label="Si"/>
        <Checkbox readOnly disabled value="no" label="No"/>
        </Checkbox.Group> 

        <div className={stylesModal.modal__solicitant}>
          <TextInput
          readOnly
            label="Departamento / Area"

            {...form.getInputProps("user_request_department")}
          />
          <TextInput
          readOnly
            className={stylesModal.input__name}
            label="Nombre"
            {...form.getInputProps("user_request_name")}
          />
          
        </div>
        

        
      </div>

      <div className={stylesModal.modal__rcontainer}>
        <Textarea 
        readOnly
        label="Notas"
        {...form.getInputProps("notes")}
        />
        <TextInput
        readOnly
        label="Mantenimiento Realizado el: "
        {...form.getInputProps("maintenance_date")}
        />

        <TextInput
        label="Tipo de Mantenimiento proximo"
        readOnly
        
        {...form.getInputProps("maintenance_type_next")}
        />
        <TextInput
        readOnly
        label="Proximo Mantenimiento"
         {...form.getInputProps("next_maintenance")}
        />
        {/* <DatePicker
          allowFreeInput
          label="Proximo Mantenimiento "
          {...form.getInputProps("next_maintenance")}
        /> */}

        <Checkbox.Group
        label="Se atendio en tiempo y forma?"
        >
        <Checkbox readOnly disabled value="yes"label="Si"/>
        <Checkbox readOnly disabled value="no" label="No"/>
        </Checkbox.Group>

        <TextInput
          readOnly
          label="Realizo Manteniemiento"
          {...form.getInputProps("user_maintenance")}
        />
        {/* <div className={stylesModal.button}>
          <Button color="red" type="submit">
          {" "}
          Cerrar{" "}
          
          </Button>
        </div> */}
      </div>
    </div>
    </form>
  );
};

export default ModalMaintHistory;
