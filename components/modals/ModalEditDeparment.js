import React from 'react'
import {useState, useEffect} from 'react'
import { useForm } from "@mantine/form";
import { Button, Center, TextInput } from '@mantine/core';
import { IconId } from '@tabler/icons';
const ModalEditDeparment = (deparmentToEdit) => {

    const form = useForm({
        initialValues:{
            department_name: deparmentToEdit.department_name,
        },
        validate: {
          
        },
      });
  return (
    <form onSubmit={form.onSubmit()}>
        <TextInput
          label="Departamento"
          {...form.getInputProps('department_name')}
          icon={<IconId />}
        />
        <Center>
          <Button color="#002a5b" type="submit">
            {" "}
            Aplicar {" "}
          </Button>
        </Center>
      </form>
      
  )
}

export default ModalEditDeparment