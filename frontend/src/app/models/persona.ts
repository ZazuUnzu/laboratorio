//Mi interfaz Persona de la práctica de Angular, agregándole la variable _id que identifica

import { DatePipe } from "@angular/common";

//cada entrada en la bbdd
export interface Persona {
    _id?: string
    nombre: string
    apellidos: string
    edad: number
    dni: string
    cumpleanos: Date
    colorFav: string
    sexo: string
} 