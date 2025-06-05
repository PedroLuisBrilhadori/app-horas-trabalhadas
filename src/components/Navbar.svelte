<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Registros, StatusTrabalho, Notas } from './store';
  import { horasTrabalhadas } from './functions';
  import { get } from 'svelte/store';

  export let view: 'home' | 'registros';

  const dispatch = createEventDispatcher<{ change: { view: 'home' | 'registros' } }>();

  function select(target: 'home' | 'registros') {
    dispatch('change', { view: target });
  }

  function mudarStatusDeTrabalho() {
    const status = get(StatusTrabalho);

    if (!status.trabalhando) {
      const inicio = new Date();
      const id = crypto.randomUUID();
      StatusTrabalho.set({
        trabalhando: true,
        inicio,
        dia: `${inicio.getDate()}/${inicio.getMonth() + 1}/${inicio.getFullYear()}`,
        id,
      });
      return;
    }

    const termino = new Date();
    const notasDoRegistro = get(Notas).filter((n) => n.registro_id === status.id);

    Registros.update((lista) => [
      ...lista,
      {
        id: status.id!,
        dia: status.dia!,
        inicio: status.inicio!,
        termino,
        horasTrabalhadas: horasTrabalhadas(status.inicio!, termino),
        notas: notasDoRegistro,
      },
    ]);

    StatusTrabalho.set({ trabalhando: false, inicio: null, dia: null, id: null });
  }
</script>

<nav class="fixed top-0 left-0 w-full flex gap-4 p-2 bg-gray-800 text-white">
  <button
    class="px-3 py-1 border rounded"
    class:bg-blue-500={view === 'home'}
    class:text-white={view === 'home'}
    on:click={() => select('home')}
  >
    Início
  </button>

  <button
    class="px-3 py-1 border rounded"
    class:bg-blue-500={view === 'registros'}
    class:text-white={view === 'registros'}
    on:click={() => select('registros')}
  >
    Registros
  </button>

  <div class="ml-auto">
    {#if $StatusTrabalho.trabalhando}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="inline-block px-3 py-1 text-sm text-white bg-indigo-600 border border-indigo-600 rounded"
        on:click={mudarStatusDeTrabalho}
      >
        você está trabalhando
      </a>
    {:else}
      <button class="px-3 py-1 border rounded" on:click={mudarStatusDeTrabalho}>
        você não está trabalhando
      </button>
    {/if}
  </div>
</nav>
