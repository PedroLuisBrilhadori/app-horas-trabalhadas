import { writable, type Writable } from "svelte/store";

export interface Registro {
  id: string;
  dia: string;
  inicio: Date;
  termino: Date;
  horasTrabalhadas: Horario;
}
export interface Horario {
  dia?: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export const Registros: Writable<Registro[]> = writable([]);
