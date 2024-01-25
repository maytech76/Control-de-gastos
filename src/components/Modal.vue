<script setup>
 import{ref, computed} from 'vue'
 import Alerta from './Alerta.vue';
 import closeModal from '../assets/img/cerrar.svg'

 const error = ref('')


 const emit = defineEmits(['close-modal', 'insert-gasto', 'update:nombre', 'update:cantidad', 'update:categoria', 'eliminar-gasto'])

 const props = defineProps({

    modal:{
        type: Object,
        required: true
    },

    nombre:{
        type: String,
        required: true,
    },

    cantidad:{
        type: [String, Number],
        required:true,

    },

    categoria:{
        type: String,
        required: true
    },

    disponible:{
        type:Number,
        required:true
    },

    id: {
        type: [String, null],
        required: true
    }
 });

 const old = props.cantidad

/*  console.log(props.id) */

  /* Funcion para agregar gasto al sistema */
  const agregarGasto = () =>{
    
    /* Validamos que no pasen campos vacios */
    const { nombre, cantidad, categoria, disponible, id } = props
        if([nombre, cantidad, categoria].includes('')) {
            error.value = 'Todos los campos son obligatorios'
            setTimeout(() => {
                error.value = ''
            }, 2500);
            return
        }


        /* Validamos que Cantidad sea mayor a 0 */
        if(cantidad <= 0) {
            error.value = 'Cantidad no válida'
            setTimeout(() => {
                error.value = ''
            }, 2500);
            return
        } 

        /* Validar que el usuario no gaste mas de lo disponible */

        if (id) {
           if (cantidad > old + disponible) {

             error.value = 'Has Excedido el Presupuesto'
                setTimeout(() =>{
                    error.value=''
                }, 2500);
    
                return
           }
            
        } else {
            
            if (cantidad > disponible) {
                
                error.value = 'Has Excedido el Presupuesto'
                setTimeout(() =>{
                    error.value=''
                }, 2500);
    
                return
            }
        }



        emit('insert-gasto')



  }


  const siEditas = computed(()=>{
    return props.id
  })

</script>

<template>
    <div class="modal">
       <div class="cerrar-modal">
        <img :src="closeModal"
         @click="$emit('close-modal')">
       </div>

       <div class="contenedor contenedor-formulario"

       :class="[modal.animar ? 'animar' : 'cerrar']"
       >

            <form class="nuevo-gasto" 
            @submit.prevent="agregarGasto"
            >
                <legend>{{ siEditas ? 'Editar Gasto' : 'Registrar Gasto' }}</legend>

                <Alerta v-if="error">{{error}}</Alerta>

                <div class="campo">
                    <label for="nombre">Nombre del Gasto</label>
                    <input type="text" id="nombre" placeholder="Agregar el nuevo gasto"
                    :value="nombre"
                    @input="$emit('update:nombre', $event.target.value)"
                    />
                   
                </div>

                <div class="campo">
                    <label for="cantidad">Monto del Gasto</label>
                    <input type="text" id="cantidad" placeholder="Agregar el Monto"
                    :value="cantidad"
                    @input="$emit('update:cantidad', +$event.target.value)"
                    />
                   
                </div>


                <div class="campo">
                    <label for="categoria">Categoria</label>
                    <select id="categoria"
                    :value="categoria"
                    @input="$emit('update:categoria', $event.target.value)"
                    >
                       
                        <option value="Seleccionar">Selec-Categoria</option>
                        <option value="combustible">Combustible</option>
                        <option value="comida">Comida</option>
                        <option value="peaje">Peaje</option>
                        <option value="hotel">Estadia</option>
                    </select>
                </div>


                <input 
                   type="submit"
                   :value="[ siEditas ? 'Editar' : 'Registrar']"
                >

            </form>

            <button
            type="button"
            class="btn-eliminar"
            v-if="siEditas"
            @click="$emit('eliminar-gasto')"
            >
                Eliminar Gasto
            </button>
       </div>
    </div>
</template>

<style scoped>
   .modal{
    position: absolute;
    background-color: rgb(0 0 0 / 0.95);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

   }

   .cerrar-modal{

    position: absolute;
    right: 2rem;
    top: 2rem;


   }

   .cerrar-modal img {
     width: 2rem;
     cursor: pointer;
   }

   /* Aplicamos estilo al contenedor-formulario */
   .contenedor-formulario{
     transition-property: all;
     transition-duration: 300ms;
     transition-timing-function: ease-in;
     opacity: 0;
   }

   .contenedor-formulario.animar{
    opacity: 1;
   }


   .contenedor-formulario.cerrar{
    opacity: 0;
   }


   /* Formulario Nuevo gasto */
   .nuevo-gasto{
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
   }

   /* Aplicamos estilo a la etiqueta legend */
   .nuevo-gasto legend {
    text-align: center;
    color: var(--blanco);
    font-size: 3rem;
    font-weight: 700;
   }

   .campo{
     display: grid;
     gap: 2rem;
     color: var(--gris-claro);
     margin-top: 2rem;
     
   }

   /* Aplicamos Stilo a los input */
   .nuevo-gasto input{
    background-color: var(--gris-oscuro);
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.5rem;


   }

   /* Aplicamos estilo a los select */
   .nuevo-gasto select {
    background-color: var(--gris-oscuro);
    border-radius: 0.5rem;
    padding: 1rem;
    border: none;
    font-size: 2rem;
   }

   /* Aplicamos estilo a label */
   .nuevo-gasto label{
    padding-bottom: 0.1rem;

   }

   .nuevo-gasto input[type="submit"]{

    margin-top: 3rem;
    background-color: var(--insert1);
    color: var(--negro);
    font-weight: 700;
    border: none;
    text-transform: uppercase;
    cursor: pointer;

   }

   .nuevo-gasto input[type="submit"]:hover{
    background-color: var(--insert2);
    color: black;
   }

   /* Boton Eliminar */
   .btn-eliminar{

    padding: 1rem;
    width: 100%;
    margin-top: 4rem;
    background-color: var(--eliminar1);
    color: var(--negro);
    font-weight: 500;
    border: none;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;

   }

   .btn-eliminar:hover{
    background-color: var(--eliminar2);
   }

</style>