<script lang="ts">
  import Notas from './components/Notas.svelte';
  import RegistrosPage from './components/RegistrosPage.svelte';
  import Navbar from './components/Navbar.svelte';
  import { StatusTrabalho } from './components/store';
  import { onDestroy } from 'svelte';

  let view: 'home' | 'registros' = 'home';

  let interval: any;

  function atualizarTitulo() {
    const { trabalhando, inicio } = $StatusTrabalho;
    if (trabalhando && inicio) {
      const agora = new Date();
      const diff = new Date(agora.getTime() - new Date(inicio).getTime());
      const hh = String(diff.getUTCHours()).padStart(2, '0');
      const mm = String(diff.getUTCMinutes()).padStart(2, '0');
      const ss = String(diff.getUTCSeconds()).padStart(2, '0');
      document.title = `🎯 ${hh}:${mm}:${ss}`;
    }
  }

  $: {
    const { trabalhando, inicio } = $StatusTrabalho;
    clearInterval(interval);
    if (trabalhando && inicio) {
      atualizarTitulo();
      interval = setInterval(atualizarTitulo, 1000);
    } else {
      document.title = '💤 aguardando...';
    }
  }

  onDestroy(() => clearInterval(interval));

</script>

<Navbar {view} on:change={(e) => (view = e.detail.view)} />

<main class="p-4 pt-16 space-y-4">

  {#if view === 'home'}
    {#if $StatusTrabalho.trabalhando}
      <div class="card">
        <Notas />
      </div>
    {/if}
  {:else if view === 'registros'}
    <RegistrosPage />
  {/if}
</main>