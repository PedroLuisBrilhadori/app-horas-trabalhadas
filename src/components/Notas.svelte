<script lang="ts">
  import { StatusTrabalho, Notas } from './store';
  import { get } from 'svelte/store';

  let conteudo = '';
  let mostrar = false;

  function markdownToHtml(text: string): string {
    let html = text;
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  function salvar() {
    const status = get(StatusTrabalho);
    if (!status.trabalhando || !status.registro_id) return;
    Notas.update((lista) => [
      ...lista,
      {
        id: crypto.randomUUID(),
        conteudo,
        registro_id: status.registro_id,
      },
    ]);
    conteudo = '';
    mostrar = false;
  }
</script>

<div class="space-y-2">
  <textarea bind:value={conteudo} class="w-full border p-2 rounded"></textarea>
  <div class="flex gap-2">
    <button class="px-3 py-1 border rounded" on:click={() => (mostrar = !mostrar)}>
      {mostrar ? 'Esconder Preview' : 'Preview'}
    </button>
    <button class="px-3 py-1 border rounded" on:click={salvar}>
      Salvar Nota
    </button>
  </div>
  {#if mostrar}
    <div class="p-2 border rounded text-left">
      {@html markdownToHtml(conteudo)}
    </div>
  {/if}
</div>
