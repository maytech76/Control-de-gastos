<script setup>
import {computed}from 'vue'
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"
import {forToNumber} from '../helpers'


defineEmits(['reset-app'])

/* Definimos los Props presupuesto y disponible */
     const Props = defineProps({
        presupuesto: {
            type: Number,
            require: true

        },

        disponible: {
            type: Number,
            require: true

        },

        gastado:{
            type: Number,
            required: true
        }
     })

  /* Desarrollamos y definimos la logica para calcular el % consumido del presupuesto */
    const porcGastos = computed(()=>{
        return parseInt(((Props.presupuesto - Props.disponible) / Props.presupuesto) * 100)
    })

</script>

<template>
    <div class="dos-columnas">

        <div class="contenedor-grafico">
          
            <p class="porcentaje">{{ porcGastos }}%</p>

           <CircleProgress
           :percent="porcGastos"
           :size="250"
           :border-width="30"
           :border-bg-width="20"
           fill-color="#EF4141"
           empty-color="#F2DFDF"
           />


        </div>

        <div class="contenedor-presupuesto">


            <button class="reset-app" type="button" @click="$emit('reset-app')">Resetear App</button>

            <p>Presupuesto: <span>  {{ forToNumber(presupuesto) }}</span></p>

            <p>Disponible: <span>  {{ forToNumber(disponible) }}</span></p>

            <p>Gastado: <span>  {{ forToNumber(gastado) }}</span></p>

        </div>

    </div>
</template>

<style scoped>

.contenedor-grafico{
    position: relative;
}

.porcentaje {
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 100;
    font-size: 3rem;
    font-weight: 900;
}

.dos-columnas {
    display: flex;
    flex-direction: column;
}

.dos-columnas >:first-child{
    margin-bottom: 3rem;
}


/* Aplicamos estilo al Boton */

.reset-app{
    background-color: #f1cd8b;
    border: none;
    padding: 1rem;
    width: 100%;
    color: rgb(106, 71, 5);
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 0.9rem;
    transition-property: background-color;
    transition-duration: 350ms;
}

.reset-app:hover{
    cursor: pointer;
    background-color: orange;
    color: rgb(25, 36, 7);
    font-weight: 800;
    text-transform: uppercase;
    border-radius: 1rem;
    font-size: 1.9rem;
}



@media(min-width:768px){
    .dos-columnas{
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .dos-columnas >:first-child{
    margin-bottom: 0rem;
    }
}

/* Aplicamos estilo a los parrafos */
.contenedor-presupuesto{
    width: 100%;
}

.contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    font-weight: 900;
    color: var(--vino);
}

@media(min-width:768px){
    .contenedor-presupuesto p{
        text-align: left;
    }
}

.contenedor-presupuesto span{
  font-weight: 200;
    color: var(--gris-oscuro);
}
</style>