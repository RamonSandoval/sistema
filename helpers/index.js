export const Fecha = fecha =>{
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleString('en-US',opciones)
} 

export const Fecha2 = fecha =>{
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleString(opciones,'es-ES',{timeZone:"UTC"})
} 