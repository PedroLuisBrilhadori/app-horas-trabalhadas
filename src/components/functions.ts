import type { Registro } from "./store";
import type { Horario } from "./store";
import { Registros } from "./store";

let registros: Registro[];

const unscribe = Registros.subscribe((registro) => {
  registros = registro;
});

export function registrosDoDia(dia: string) {
  return registros.filter((registro) => {
    return registro.dia === dia;
  });
}

export function horasTrabalhadas(DataInicio: any, DataTermino: any): Horario {
  let diferenca: Date;

  if (DataInicio > DataTermino) {
    diferenca = new Date(DataInicio - DataTermino);
  } else {
    diferenca = new Date(DataTermino - DataInicio);
  }

  return {
    dia: diferenca.getUTCHours(),
    horas: diferenca.getUTCHours(),
    minutos: diferenca.getUTCMinutes(),
    segundos: diferenca.getUTCSeconds(),
  };
}

export function horarioParaString(horario: Horario): string {
  return `${horario.dia ? `${horario.dia} dias e:` : ``}${horario.horas}:${
    horario.minutos
  }:${horario.segundos}`;
}

export function horarioDeUmaData(date: Date): Horario {
  return {
    horas: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds(),
  };
}
