<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import { horarioParaString } from './lib/functions';
  import {Registros} from './lib/store';

</script>

<main>
  <div class="card">
    <Counter />
  </div>

  {#if $Registros.length !== 0}
  <div class="flex flex-col"> 
    <div>
      <h1 class="text-lg"> Seu registro de trabalho: </h1>
      <div>
        {#each $Registros as {dia, inicio, termino, horasTrabalhadas}}
        <div class="m-5 p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="block bg-white text-black rounded-xl">
            
            <div class="flex items-center justify-center text-sm" > 
              <span class="material-symbols-outlined">
                calendar_month
              </span>:
              
              <p>{dia}</p>
            </div>
            
            <div class="flex items-center justify-center text-sm" > 
              <span class="material-symbols-outlined">
                schedule
              </span>:
              
              <p>
                {horarioParaString(horasTrabalhadas)}
              </p>
            </div>
          </a>
        </div>
        {/each}
      </div>
    </div>
  </div>
  {/if}
  
</main>