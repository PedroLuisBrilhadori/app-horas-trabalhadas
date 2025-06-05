<script lang="ts">
  import Markdown from 'svelte-exmarkdown';
  import { gfmPlugin } from 'svelte-exmarkdown/gfm';
  import { StatusTrabalho, Notas } from './store';

  const plugins = [gfmPlugin()];

  let conteudo = '';
  let showPreview = true;

  let prevTrabalhando = $StatusTrabalho.trabalhando;

  $: if (prevTrabalhando && !$StatusTrabalho.trabalhando) {
      salvarNota();
  }
  $: prevTrabalhando = $StatusTrabalho.trabalhando;

  function salvarNota() {
    const registroId = $StatusTrabalho.id;
    if (!registroId || conteudo.trim() === '') return;

    Notas.update((lista) => [
      ...lista,
      { id: crypto.randomUUID(), conteudo, registro_id: registroId }
    ]);
    conteudo = '';
  }
</script>

<div class="flex">
  <div class="w-1/2 p-2">
    <div class="space-x-2 mb-2">
      <button class="px-3 py-1 border rounded" on:click={() => showPreview = !showPreview}>preview</button>
      <button class="px-3 py-1 border rounded" on:click={salvarNota}>salvar nota</button>
    </div>
    <textarea bind:value={conteudo} class="w-full h-64 border p-2 rounded resize-y"></textarea>
  </div>
  {#if showPreview}
    <div class="w-1/2 p-2">
      <Markdown md={conteudo} {plugins} />
    </div>
  {/if}
</div>
