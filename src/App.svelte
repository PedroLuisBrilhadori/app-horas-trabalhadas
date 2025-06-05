<script lang="ts">
  import Counter from './components/Counter.svelte';
  import RegistrosPage from './components/RegistrosPage.svelte';
  import Navbar from './components/Navbar.svelte';

  let view: 'home' | 'registros' = 'home';

</script>

<Navbar {view} on:change={(e) => (view = e.detail.view)} />

<main class="p-4 pt-16 space-y-4">

  {#if view === 'home'}
    <div class="card">
      <Counter />
    </div>
  {:else if view === 'registros'}
    <RegistrosPage />
  {/if}
</main>