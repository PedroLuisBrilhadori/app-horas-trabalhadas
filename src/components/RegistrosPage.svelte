<script lang="ts">
  import { Registros } from './store';
  import { horarioDeUmaData, horarioParaString } from './functions';
  import { derived } from 'svelte/store';

  let filtro = '';

  const filtrados = derived([Registros], ([$Registros]) =>
    $Registros.filter((r) => r.dia.includes(filtro))
  );
</script>

<div class="space-y-2">
  <input
    type="text"
    placeholder="Filtrar por dia"
    bind:value={filtro}
    class="border p-1 rounded"
  />

  <table class="min-w-full table-auto border-collapse border rounded-lg overflow-hidden">
    <thead class="bg-gray-100">
      <tr>
        <th class="px-3 py-2 border">ID</th>
        <th class="px-3 py-2 border">Dia</th>
        <th class="px-3 py-2 border">Início</th>
        <th class="px-3 py-2 border">Término</th>
        <th class="px-3 py-2 border">Horas trabalhadas</th>
      </tr>
    </thead>
    <tbody>
      {#each $filtrados as registro (registro.id)}
        <tr class="text-center odd:bg-white even:bg-gray-50 border-t">
          <td class="px-3 py-1 border font-mono text-sm">{registro.id}</td>
          <td class="px-3 py-1 border">{registro.dia}</td>
          <td class="px-3 py-1 border">{horarioParaString(horarioDeUmaData(registro.inicio))}</td>
          <td class="px-3 py-1 border">{horarioParaString(horarioDeUmaData(registro.termino))}</td>
          <td class="px-3 py-1 border">{horarioParaString(registro.horasTrabalhadas)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
