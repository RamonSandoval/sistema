import { ActionIcon, Button, Center, Group, Table } from "@mantine/core";
import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "../../styles/DepartmentAreaStats.module.css"

const DepartmentStats = () => {
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setArrayProd] = useState([]);
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
    setarrayDep(listDepartment.data);
  }

  return (
    <>
      <div className={styles.groupContainer}>
      <Table highlightOnHover className={styles.tableDepartments}>
        <thead>
          <tr>
            <th>
              <Center>Departamento</Center>
            </th>
            <th>
              <Center>Cantidad de Equipos</Center>
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayDep &&
            arrayDep.map((data) => (
              <tr key={data.department_name}>
                <td>
                  <Center>{data.attributes.department_name}</Center>
                </td>
                <td>
                  <Center>{data.attributes.devices.data.length}</Center>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Table highlightOnHover className={styles.tableProduction}>
        <thead>
          <tr>
            <th>
              <Center>Area de Produccion</Center>
            </th>
            <th>
              <Center>Cantidad de Equipos</Center>
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayProd &&
            arrayProd.map((data) => (
              <tr key={data.name}>
                <td>
                  <Center>{data.attributes.name}</Center>
                </td>
                <td>
                  <Center>{data.attributes.devices.data.length}</Center>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default DepartmentStats;
