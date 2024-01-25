

<template>

   <div class="alerta"
   
   >
     
   <slot>
   </slot>

  </div>
 
</template>

<style scoped>
   .alerta{
    padding: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.3rem;
    text-align: center;
    background-color: rgb(233, 200, 200);
 
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    border-left: .4rem solid #b91c1c;
    color: var(--vino);
    margin-bottom: 2rem;
   }
</style>