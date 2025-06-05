<script lang="ts">
  import { Registros, StatusTrabalho, Notas } from './store';
  import { horasTrabalhadas } from './functions';
  import { get } from 'svelte/store';

  $: trabalhando = $StatusTrabalho.trabalhando;

  function mudarStatusDeTrabalho() {
    const status = get(StatusTrabalho);

    if (!status.trabalhando) {
      const inicio = new Date();
      StatusTrabalho.set({
        trabalhando: true,
        inicio,
        dia: `${inicio.getDate()}/${inicio.getMonth() + 1}/${inicio.getFullYear()}`,
        registro_id: crypto.randomUUID(),
      });
      return;
    }

    const termino = new Date();

    const notas = get(Notas).filter((n) => n.registro_id === status.registro_id);

    $Registros = [
      ...$Registros,
      {
        id: status.registro_id!,
        dia: status.dia!,
        inicio: status.inicio!,
        termino,
        horasTrabalhadas: horasTrabalhadas(status.inicio!, termino),
        notas,
      },
    ];

    StatusTrabalho.set({ trabalhando: false, inicio: null, dia: null, registro_id: null });
  }

</script>

{#if trabalhando}
<!-- svelte-ignore a11y-missing-attribute -->
<a class="inline-block px-12 py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring" on:click={mudarStatusDeTrabalho}>
  você está trabalhando
</a>

{:else}

<button class="" on:click={mudarStatusDeTrabalho}>
  você não está trabalhando
</button>

{/if}
