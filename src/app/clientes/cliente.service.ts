import { Injectable } from '@angular/core';
//import { DatePipe, formatDate } from '@angular/common';
import{Cliente} from './cliente';
import { Observable,  throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { catchError, map,tap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Injectable()

export class ClienteService {

private urlEndPoint:string='http://localhost:9090/api/clientes';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, public router: Router  ) { }


  getClientes(page: number): Observable<any> {
   return this.http.get(this.urlEndPoint + '/page/' + page).pipe(

     map((response: any) => {
       (response.content as Cliente[]).map(cliente => {
         cliente.nombre = cliente.nombre.toUpperCase();
         //let datePipe = new DatePipe('es');
         //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
         //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
         return cliente;
       });
       return response;
     }),
    // tap(response => {
      // console.log('ClienteService: tap 2');
    //   (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
    // })
   );
 }





  create(cliente: Cliente) : Observable<Cliente> {
      return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
        map((response:any)=> response.cliente as Cliente),
        catchError(e => {
          if(e.status==400){
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire('Algo ocurrio al crear', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }






    getCliente(id: number): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Algo ocurrio al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
        map((response:any)=> response.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Algo ocurrio al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(

      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Algo ocurrio al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );



  }



  }
