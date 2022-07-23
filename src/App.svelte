<script lang="ts">
  import Card from './components/card.svelte';
import Counter from './components/Counter.svelte'
  import { horarioDeUmaData, horarioParaString } from './components/functions';
  import {Registros} from './components/store';

</script>

<main>
  <div class="card">
    <Counter />
  </div>

  {#if $Registros.length !== 0}
  <div class="flex flex-col"> 
      <h1 class="text-lg"> Seu registro de trabalho: </h1>
      <div>
        {#each $Registros as {dia, inicio, horasTrabalhadas}}
          <Card 
            dia={dia} 
            inicio={horarioParaString(horarioDeUmaData(inicio))}
            horasTrabalhadas={horarioParaString(horasTrabalhadas)}
          />
        {/each}
      </div>
  </div>
  {/if}
</main>