<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let view: 'home' | 'registros';

  const dispatch = createEventDispatcher<{ change: { view: 'home' | 'registros' } }>();

  function select(target: 'home' | 'registros') {
    dispatch('change', { view: target });
  }
</script>

<nav class="space-x-4">
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
</nav>
