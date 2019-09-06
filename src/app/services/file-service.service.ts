import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, retry } from 'rxjs/operators';
// importar modelo
import { Files, InputFile } from '../Models/Files';

const URLGETIMAGE = 'filesapi';
const URLPOSTIMAGE = 'file/upload';
@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http: HttpClient) { }

   // damos permiso a las opciones http
   private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  // servicio para cargar archivos
  getImageFromApi(): Observable<Files[]> {
    return this.http.get<Files[]>(`${environment.PATH_BASE}/${URLGETIMAGE}`, this.httpOptions)
                    .pipe(
                      retry(3),
                      map(result => result),
                      catchError(this.handleError)
                    );
  }

  /**
   * 
   * @param form 
   */
  // enviar del formulario
  uploadFile(form): Observable<any> {
    return this.http.post<any>(`${environment.PATH_BASE}/${URLPOSTIMAGE}/`, form, this.httpOptions)
            .pipe(
              retry(3),
              map(response => response),
              catchError(this.handleError));
  }

  /**
   * agregar funcion que intercepta el error en caso de ocurrir
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
