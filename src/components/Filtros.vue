<script setup>
 defineProps(['filtro'])
 defineEmits(['update:filtro'])
</script>

<template>
    
    <div class="filtros sombra contenedor">
        <form>
            <div class="campo">
                <label for="filtro">Filtrar Gastos</label>

                <select id="filtro"
                    :value="filtro"
                    @input="$emit('update:filtro', $event.target.value)"
                    >
                       
                        <option value="">----Todas---</option>
                        <option value="combustible">Combustible</option>
                        <option value="comida">Comida</option>
                        <option value="peaje">Peaje</option>
                        <option value="hotel">Hotel</option>
                    </select>

            </div>
        </form>
    </div>
 
</template>

<style scoped>
  .filtros {
    margin-top: 8rem;
  }

  .filtros .campo{

    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .filtros label{

    font-size: 2.5rem;
    font-weight: 700;
    color: var(--gris-oscuro);
  }

  .filtros select{

    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
   /*  background-color: var(--gris-claro); */
   text-align: center;
  }
</style>