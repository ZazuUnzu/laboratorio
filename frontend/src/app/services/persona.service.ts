import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  readonly URL_API = 'http://localhost:4000/api/agenda';


  personaSeleccionada: Persona = {
    _id: undefined,
    nombre: '',
    apellidos: '',
    edad: 0,
    dni: '',
    cumpleanos: new Date,
    colorFav: '',
    sexo: '',
  }

    // opcionesSexo: string[] = ['Mujer', 'Hombre', 'No binario', 'No declarado']
    selectSexo = [
      { id: 1, value: 'Mujer' },
      { id: 2, value: 'Hombre' },
      { id: 3, value: 'No binario' },
      { id: 4, value: 'No declarado' }
    ]

  listaPersonas: Array <Persona> = [];
 
  constructor(private http: HttpClient) { 
    this.personaSeleccionada
  }

  listarPersonas() { //Función para que retorne los datos de la API, que serán un array de tipo Persona
    return this.http.get<Persona[]>(this.URL_API);

  }

  crearPersona(persona:Persona) {
    return this.http.post(this.URL_API,persona);

  }

  actualizarPersona(persona: Persona) {
    return this.http.put(`${this.URL_API}/${persona._id}`, persona);
  }

  eliminarPersona(_id:any) {
    return this.http.delete(`${this.URL_API}/${_id}`);//Esto va a crear una petición delete con
    //http://localhost:4000/api/agenda/_id

  }

}
 