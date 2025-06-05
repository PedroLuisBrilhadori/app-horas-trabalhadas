<script lang="ts">
  import Counter from './components/Counter.svelte';
  import RegistrosPage from './components/RegistrosPage.svelte';

  let view: 'home' | 'registros' = 'home';

</script>

<main class="p-4 space-y-4">
  <nav class="space-x-4">
    <button class="px-3 py-1 border rounded" on:click={() => (view = 'home')}>Início</button>
    <button class="px-3 py-1 border rounded" on:click={() => (view = 'registros')}>Registros</button>
  </nav>

  {#if view === 'home'}
    <div class="card">
      <Counter />
    </div>
  {:else if view === 'registros'}
    <RegistrosPage />
  {/if}
</main>