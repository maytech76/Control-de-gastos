<script setup>
 import{ref, reactive, watch, computed, onMounted} from 'vue'
 import Presupuesto from './components/Presupuesto.vue';
 import ControlPresupuesto from './components/ControlPresupuesto.vue';
 import Modal from './components/Modal.vue'
 import Filtros from './components/Filtros.vue'
 import Gasto from './components/Gasto.vue'
 import {generarId} from './helpers'
 import AddNewSpent from './assets/img/nuevo-gasto.svg'

  /* Definimos la constante para nuestro modal */
  const modal = reactive({
    mostrar: false,
    animar: false
   })

  /* INICIAMOS TODOS LOS STATES */

   /*  definimos el valor inicial por defecto */
  const presupuesto = ref(0)

    /*  definimos el valor inicial de Disponible */
  const disponible = ref(0)

  /*  definimos el valor inicial de lo Gastado */
  const gastado = ref(0)

  const filtro = ref ('')



  /* Definimos el State reactivo para trabajar con el formulario gastos */
  const gasto = reactive({
    nombre:'',
    cantidad:'',
    categoria:'',
    id: null,
    fecha: Date.now()

  })


  const gastos = ref([])


  /* Configuramos watch que estara atento a los cambios del state gastos */
  watch(gastos, ()=>{

    /* sumamos la cantidad de cada gasto logrando el total gastado */
    const totalGastado = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0)
    gastado.value = totalGastado

    /* Restamos el Presupuesto y totalgastado - obtenemos el totaldisponible */
    disponible.value = presupuesto.value - totalGastado
    
    /* Cada vez que la funcion gasto sufra cambios esos cambio los enviamos a localStorage  
     Convertimos los datos de gastos de JSON a String y lo enviamos a localstorage 'gastos' */
    localStorage.setItem('gastos', JSON.stringify(gastos.value))

  }, {
     deep: true
  })


  /* Configuramos watch que estara atento si No esta en el estado mostar (Reinicia sus Valores) */
  watch(modal, () => {
    if(!modal.mostrar) {
      reiniciarStateGasto();
    }
  }, {
    deep: true
  })


  /* Configuramos un watch que estara atento si se define una cantidad a presupuesto */
  watch (presupuesto, ()=>{
    localStorage.setItem('presupuesto', presupuesto.value)
  })


  onMounted(()=>{
    const presupuestoStorage = localStorage.getItem('presupuesto')
    if(presupuestoStorage){
      presupuesto.value = Number(presupuestoStorage)
      disponible.value = Number(presupuestoStorage)
    }

    /* Configuramos datos persistente en localstrorage 'gastos' */
    const gastosStorage = localStorage.getItem('gastos')
    if(gastosStorage){
      gastos.value = JSON.parse(gastosStorage)
    }
  })



  /* funcion que tomara el valor del argumento cantidad recibido */
  const definirPresupuesto = (cantidad)=>{
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  /* Funciones para el Modal */
  const mostrarModal = ()=>{
    modal.mostrar = true
    setTimeout(() => {
      modal.animar = true
    }, 300);
  }


  const closeModal = ()=>{
    modal.animar = false
    setTimeout(() => {
      modal.mostrar = false
    }, 300);
  }

  const reiniciarStateGasto = () => {
      // Reiniciar el objeto
      Object.assign(gasto, {
        nombre: '',
        cantidad: '',
        categoria: '',
        id: null,
        fecha: Date.now()
       })
  }
    /* Función que recibe una emision de datos desde Modal.vue */
  const insertGasto = ()=>{
    if (gasto.id) {
      //EDITANDO
      const { id } = gasto
      const i = gastos.value.findIndex((gasto => gasto.id === id))
      gastos.value[i] = {...gasto}

      
    } else {

      //INSERTANDO
      gastos.value.push({
        ...gasto,
        id: generarId() 
      })
      
    }

    /* Una vez enviado el Gasto Ocultamos Modal */
    closeModal()

    /* Reiniciamos Inputs del modal */
    reiniciarStateGasto()

  }


  const seleccionarGasto = id =>{
    const gastoEditar = gastos.value.filter(gasto => gasto.id === id)[0]
    Object.assign(gasto, gastoEditar);
    mostrarModal()
  }


  const eliminarGasto = () =>{
    if(confirm('Eliminar?')) {
      gastos.value = gastos.value.filter(gastoState => gastoState.id !== gasto.id)
      closeModal()
    }
  }

  const gastosFiltrados = computed(()=>{

    if (filtro.value) { /* si existe un valor filtrado en el select */

      /* muestrame solo los valores de gastos seleccionados por el valor del filtro x categoria */ 
      return gastos.value.filter(gasto =>gasto.categoria === filtro.value)

    }
    return gastos.value /* mostramos los gastos con esos valores */
  })

 /* Resetear Apps  */
 const resetApp = () =>{
  if(confirm('Seguro de Resetear Valores de Presupuesto y Gastos?')) {
      gastos.value = []
      presupuesto.value = 0
      
    }
 }


</script>

<template>
  <div :class="{fijar:modal.mostrar}">
    <header>
      <h1>Control de Gastos</h1>

      <div class="contenedor-header contenedor sombra">
          <Presupuesto

          v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
          />

          <ControlPresupuesto
           v-else
           :presupuesto="presupuesto"
           :disponible="disponible"
           :gastado="gastado"
           @reset-app="resetApp"
          />
          
      </div>
    </header>

      <main v-if="presupuesto > 0">

        <filtros v-model:filtro="filtro"/>

        <div class="listado-gasto contenedor">
            <h2>{{ gastosFiltrados.length > 0 ? 'Gastos' : 'No Existen Gastos' }}</h2>

            <Gasto
                v-for="gasto in gastosFiltrados"
                :key="gasto.id"
                :gasto="gasto"
                @selecionar-gasto="seleccionarGasto "
            />
        </div>


        <div class="crear-gasto">
           <img :src="AddNewSpent" @click="mostrarModal">
        </div>

          <Modal
            v-if="modal.mostrar" 
            @closeModal="closeModal" 
            @insert-gasto="insertGasto"
            @eliminar-gasto="eliminarGasto"
            :modal="modal"
            :disponible="disponible"
            :id="gasto.id"
            v-model:nombre="gasto.nombre"
            v-model:cantidad="gasto.cantidad"
            v-model:categoria="gasto.categoria"
          />
      </main>

  </div>
  
 
</template>

<style>
:root{
  --vino: #820000;
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #F5F5F5;
  --gris:#94A3B8;
  --gris-oscuro: #545658;
  --negro:#000;
  --insert1: #A6F492;
  --insert2:#65F43D;
  --editar1: #F2EF91;
  --editar2: #E1F240;
  --eliminar1: #EF8F8F;
  --eliminar2: #EF4141;

}
html{
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*.after{
  box-sizing: inherit;
}

body{
  font-size: 1.6rem;
  font-family: "lato", sans-serif;
  background-color: var(--gris-claro);
}
h1{
  font-size: 4rem;
}
h2{
  font-size: 3rem;
}

/* Aplicamos estilo para el fondo 0.9 opacidad del formulario */
.fijar {
  overflow: hidden;
  height: 100vh;
}


header{
  background: rgb(120,9,9);
  background: linear-gradient(180deg, rgba(120,9,9,1) 0%, rgba(184,11,11,1) 52%, rgba(237,5,5,1) 100%, rgba(255,0,0,1) 100%);
}
header h1{
  padding: 3rem;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.contenedor{
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header{
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra{
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}

.crear-gasto{
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}


.crear-gasto img{
  width: 5rem;
  cursor: pointer;
 
  
}

.listado-gasto{
 margin-top: 10rem;
}

.listado-gasto h2 {

  font-weight: 100;
}


</style>
