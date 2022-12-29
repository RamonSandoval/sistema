/**
 * It fetches data from the API and sets it to the data state
 * 
 * @return Nothing.
 */
import React from "react";
import { useState, useEffect } from "react";
import {useState, useEffect} from 'react'

const conection = () => {
  const urlApi = "http://localhost:1337/api/devices?populate=*";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  
  return (
    <></>
  );
};
export async function getStaticProps(){
    const respuesta = await fetch(urlApi)
    const data = await respuesta.json()
    console.log(data)
    return{
      props:{
        data
      }
    }
  
  }
export default conection;
