import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from '@mantine/core';
import styles from '../styles/Tabs.module.css'
import { IconCalendarEvent,IconBuilding, IconStatusChange, IconTool } from '@tabler/icons';


const reports = () => {
  return (
    <>
    <Layout tituloPagina="Reportes"/>
    <Tabs defaultValue="mantMes" className={styles.tabs__container}>
      <Tabs.List>
        <Tabs.Tab icon={<IconCalendarEvent size={14} />} value="mantMes">
          Mantenimientos por Mes
        </Tabs.Tab>
      
        <Tabs.Tab icon={<IconBuilding size={14} />} value="mantDep">
          Mantenimientos por Departamento
        </Tabs.Tab>

        <Tabs.Tab icon={<IconTool size={14} />} value="troubleshoot">
          Fallas en Dispositivos
        </Tabs.Tab>

        <Tabs.Tab icon={<IconStatusChange size={14} />} value="quality">
          Calidad de Atencion
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel pt={20} value="mantMes">Por mes</Tabs.Panel>
      <Tabs.Panel pt={20} value="mantDep">Mantenimiento por Departamento</Tabs.Panel>
      <Tabs.Panel pt={20} value="troubleshoot">Fallas</Tabs.Panel>
      <Tabs.Panel pt={20} value="quality">Calidad</Tabs.Panel>
    </Tabs>
    </>
    
  )
}

export default reports