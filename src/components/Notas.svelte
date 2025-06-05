<script lang="ts">
  import { StatusTrabalho, Notas } from './store';
  import { get } from 'svelte/store';
  import { marked } from 'marked';
  import { markedHighlight } from 'marked-highlight';
  import hljs from 'highlight.js';

  marked.use(
    markedHighlight({
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    })
  );

  let conteudo = '';
  let mostrar = false;

  function markdownToHtml(text: string): string {
    return marked.parse(text);
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
  <div class="flex flex-col md:flex-row gap-4">
    <textarea
      bind:value={conteudo}
      class="flex-1 h-64 border p-2 rounded font-mono"
    ></textarea>

    {#if mostrar}
      <div class="flex-1 h-64 border p-2 rounded overflow-auto text-left">
        {@html markdownToHtml(conteudo)}
      </div>
    {/if}
  </div>

  <div class="flex gap-2">
    <button class="px-3 py-1 border rounded" on:click={() => (mostrar = !mostrar)}>
      {mostrar ? 'Esconder Preview' : 'Preview'}
    </button>
    <button class="px-3 py-1 border rounded" on:click={salvar}>
      Salvar Nota
    </button>
  </div>
</div>
