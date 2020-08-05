import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listaCurso: string[] = ['FRAMEWORK ANGULAR','FRAMEWORK SPRING ', 'NPM ','TypeScript','Bootstrap','JPA','DB_POSTGRESQL'];
  habilitar: boolean=true;
   constructor() { }

   setHabilitar():void{
     this.habilitar = (this.habilitar==true)? false : true;

   }

  }
