import { Button, Center, TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from "@mantine/form";
import api from '../../services/api';
import Notifications from "../Notifications";



const ModalAddUser = () => {

  async function createUser(){
    const body = {
      data:{
        username: form.values.username,
        email: form.values.email,
       /*  confirmed: form.values.confirmed,
        blocked: form.values.blocked */
      },
    };
    try{
      await api.addUser(body)
      Notifications.success("Se ha agregado al usuario " );
    }
    catch(error){
      Notifications.error("El usuario ya existe");
    }
  }

  const form = useForm ({
    initialValues:{
      username: "",
      email: "",
      confirmed: "",
      blocked: ""
    },
    
    /* validate:{
      username: (value) => username.length === 0 ? "Ingrese un nombre de Usuario" : null,
      email: (value) => email.length === 0  ? "Ingrese un correo" : null,
      confirmed: (value) => username.length === 0 ? "Ingrese el Estatus del nuevo usuario" + username : null,
      blocked: (value) => username.length === 0 ? "Usuario bloqueado?" : null,
    }  */

  })
  return (
    <form onSubmit={form.onSubmit(createUser)}>
        <TextInput label="Usuario" {...form.getInputProps("username")}/>
        <TextInput label="Correo"  {...form.getInputProps("email")}/>
        <TextInput label="Estatus"  {...form.getInputProps("confirmed")}/>
        <TextInput label="Bloqueado"  {...form.getInputProps("blocked")}/>
        
        <Center pt={10}><Button type='submit' >{" "}Agregar{""}</Button></Center>
      </form>
  )
}

export default ModalAddUser