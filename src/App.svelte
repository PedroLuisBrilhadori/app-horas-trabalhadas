<script lang="ts">
  import Counter from './components/Counter.svelte';
  import RegistrosPage from './components/RegistrosPage.svelte';
  import Navbar from './components/Navbar.svelte';

  let view: 'home' | 'registros' = 'home';

</script>

<main class="p-4 space-y-4">
  <Navbar {view} on:change={(e) => (view = e.detail.view)} />

  {#if view === 'home'}
    <div class="card">
      <Counter />
    </div>
  {:else if view === 'registros'}
    <RegistrosPage />
  {/if}
</main>