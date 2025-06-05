import { writable, type Writable } from "svelte/store";

export interface NotaDeRegistro {
  id: string;
  conteudo: string;
  registro_id: string;
}

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

export const Registros: Writable<Registro[]> = writable([]);

export const Notas: Writable<NotaDeRegistro[]> = writable([]);

export interface StatusTrabalho {
  trabalhando: boolean;
  inicio: Date | null;
  dia: string | null;
  registro_id: string | null;
}

export const StatusTrabalho: Writable<StatusTrabalho> = writable({
  trabalhando: false,
  inicio: null,
  dia: null,
  registro_id: null,
});
