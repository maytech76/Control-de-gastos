<script setup>

    import {forToNumber, formatFecha} from '../helpers/index'
  
   
    import IconoComida from '../assets/img/icono_comida.svg'
    import IconoFuel from '../assets/img/icono_gasolina.svg'
    import IconoHotel from '../assets/img/icono_hotel.svg'
    import IconoPeaje from '../assets/img/icono_peaje.svg'
   
  
    const props = defineProps({
        gasto:{
            type: Object,
            required: true
        }
    })

    const diccionarioIconos = {

        comida : IconoComida,
        combustible : IconoFuel,
        hotel : IconoHotel,
        peaje : IconoPeaje,
        
    }

    defineEmits(['selecionar-gasto'])


</script>

<template>

   <div class="gasto sombra">

        <div class="contenido">

                <img 
                :src="diccionarioIconos[gasto.categoria]" 
                alt="icono gasto"
                class="icono"
                >

            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>

                <p class="nombre" @click="$emit('selecionar-gasto', gasto.id)">{{ gasto.nombre }}</p>

                <p class="fecha">Fecha: <span> {{ formatFecha( gasto.fecha) }}</span>  </p>
            </div>
        </div>

        <p class="cantidad">{{forToNumber(gasto.cantidad)}}</p>

   </div>

</template>


<style scoped>
.gasto {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 2rem;
}

.contenido {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.icono {
 width: 7rem;
}

.detalles p{
 margin: 0 0 1rem 0;
}

.categoria {
 color: var(--gris-oscuro);
 font-size: 1.8rem;
 text-transform: uppercase;
 font-weight: 900;
}

.nombre {
  color: var(--vino);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
}

.fecha {
 color: var(--gris-oscuro);
 font-size: 700;
 font-weight: 800;
}

.fecha span {
 font-weight: 300;
 color: var(--gris);
}

.cantidad {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
}
</style>