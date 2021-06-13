import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service'
import { NgForm } from '@angular/forms'
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {


  constructor(public personaService: PersonaService) { }

  ngOnInit(): void {
    this.listarPersonas();
  }

  limpiarForm(miform: NgForm) {
    miform.reset()
  }

  listarPersonas() { //Sería el getPersonas del back
    this.personaService.listarPersonas().subscribe( 
      res => {
        this.personaService.listaPersonas= res; //Con la respuesta, vamos a llenar el array listaPersonas. 
      }, 
      err => console.error(err)
    );
  }

  insertarContacto(miform: NgForm) {
     if(miform.value._id) //si existe un valor para este campo significa que
     //estamos editando o actualzando, no creando un usuario.
     {
       this.personaService.actualizarPersona(miform.value).subscribe(
         (res) => {
          this.listarPersonas();
          this.limpiarForm(miform)
         },
         (err) => console.error(err)
       );
     } else {
      this.personaService.crearPersona(this.personaService.personaSeleccionada).subscribe(
        (res) => {
          this.listarPersonas();
          miform.reset()
        },
        (err) => console.error(err)
      )
     }
  }

  eliminarContacto(_id:any, miform: NgForm){
    if(confirm('¿Seguro que quieres eliminar a este usuario?')){
      this.personaService.eliminarPersona(_id).subscribe(
        (res) => {
          this.listarPersonas();          
        },
        (err) => console.error(err)
      )   
    }
  }

  editarContacto(persona: Persona ) {
    this.personaService.personaSeleccionada = persona;
  }



}
