
 /* Convertimos el dato de tipo String a Number */
export const forToNumber = cantidad =>{

    /* devolvemos con formato numero lo que recibimos coomo String */
   /*  return Number(cantidad). toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    }) */

    return Number(cantidad). toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}
    


  /* Auto Generamos un ID unico para cada Reg-Gasto */
export const generarId = () =>{
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return random + fecha
}

/* Formateamos fecha */

export const formatFecha = fecha=>{
    const newDate = new Date(fecha)
    const opciones ={
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return newDate.toLocaleDateString('es-ES', opciones)
}