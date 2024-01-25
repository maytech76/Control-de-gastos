<script setup>
 import { ref } from 'vue';
 import Alerta from './Alerta.vue'

 const presupuesto = ref(0)

 /* Definimos un state para los errores */
 const error = ref('')



 const emit = defineEmits(['definir-presupuesto'])

    const definirPresupuesto =()=>{

        if (presupuesto.value <= 0 || presupuesto.value==''){
            error.value = 'Presupuesto NO Valido'

            setTimeout(()=>{
                error.value = ''
            }, 3000);

            return
        }
        emit('definir-presupuesto', presupuesto.value)
    }

</script>

<template>
   <form class="presupuesto"

            @submit.prevent="definirPresupuesto"
        >

        <Alerta 
        
        v-if="error"> <!-- si existe error muestra el mensaje -->
            
            {{ error }}
        </Alerta>
            
        <div class="campo">
            <label for="nuevo-presupuesto">Definir Presupuesto</label>
            <input 
            id="nuevo-presupuesto"
            class="nuevo-presupuesto"
            placeholder="Insertar valor del Presupuesto"
            type="number"
            min="0"
            v-model.number="presupuesto"
            />
        </div>
         <input type="submit" value="Definir Presupuesto">
   </form>
 
</template>

<style scoped>

.presupuesto{
  text-align: center;
  width: 100%;
}
.campo{
    display: grid;
    gap: 2rem;
}

.presupuesto label{

    text-align: center;
    font-size: 2.2rem;
    color: var(--vino);
}

.presupuesto input[type="number"]{
    background-color: var(--gris-claro);
    border-radius: .2rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;

}

.presupuesto input[type="submit"]{

   
    background-color: rgb(242, 73, 73);
    color: rgb(8, 8, 8);
    font-weight: 900;
    border-radius: 1rem;
    border: none;
    padding: 1rem;
    margin-top: 2rem;
    text-align: center;
    width: 95%;
    transition: background-color 300 ms ease;


}

.presupuesto input[type="submit"]:hover{

    background-color: var(--vino);
    color: var(--blanco);
    font-weight: 800;
    text-transform: uppercase;

  
}

</style>