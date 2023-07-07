import {Bus} from "./bus" ;

export class Trip {
  id: number ;
  lugarSalida: string ;
  lugarDestino: string ;
  fechaLlegada: Date ;
  fechaSalida: Date ;
  personaId: number[] ;
  idColectivo: number ;
  colectivo: Bus ;

  constructor(id: number, lugarSalida: string, lugarDestino: string, fechaLlegada: string, fechaSalida: string, idColectivo: number, personaId: number[], colectivo: any ) {
    this.id = id ;
    this.lugarSalida = lugarSalida ;
    this.lugarDestino = lugarDestino ;
    this.fechaLlegada = new Date(fechaLlegada) ;
    this.fechaSalida = new Date(fechaSalida);
    this.idColectivo = idColectivo ;
    this.personaId = personaId ; 
    this.colectivo = colectivo ; 
  }
}