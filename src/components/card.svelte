<script lang="ts">
    let dia: string;
    let inicio: string;
    let horasTrabalhadas: string;

    export {dia, inicio, horasTrabalhadas}
</script>

<main>

    <div class="m-5 p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="block p-2 bg-white text-black rounded-xl">
          
          <div class="flex items-center justify-center text-sm" > 
            <span class="material-symbols-outlined">
              calendar_month
            </span>:
            
            <p>{dia}</p>
          </div>
          
          <div class="mt-2 flex justify-center items-center text-sm" > 
            <div class="flex mr-5"> 
              <span class="material-symbols-outlined">
                history
              </span>

              <p>{inicio}</p>
            </div>

            <div class="flex">
              <span class="material-symbols-outlined">
                update
              </span>:

              <p>{horasTrabalhadas}</p>
            </div>

          </div>
        </a>
      </div>

</main>