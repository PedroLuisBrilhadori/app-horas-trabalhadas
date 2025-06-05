import { writable, type Writable } from "svelte/store";

export interface Registro {
  id: string;
  dia: string;
  inicio: Date;
  termino: Date;
  horasTrabalhadas: Horario;
  notas: NotaDeRegistro[];
}

export interface Horario {
  dia?: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export interface NotaDeRegistro {
  id: string;
  conteudo: string;
  registro_id: string;
}

export const Registros: Writable<Registro[]> = writable([]);
export const Notas: Writable<NotaDeRegistro[]> = writable([]);

export interface StatusTrabalho {
  trabalhando: boolean;
  inicio: Date | null;
  dia: string | null;
  id: string | null;
}

export const StatusTrabalho: Writable<StatusTrabalho> = writable({
  trabalhando: false,
  inicio: null,
  dia: null,
  id: null,
});
