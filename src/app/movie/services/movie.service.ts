import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericModel } from '../models/generic.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService<T extends GenericModel> {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = `${environment.apiUrl}/?apikey=${environment.apiToken}`;
  }

  public async get(params): Promise<T> {
    const queryString = this.jsonToQueryString(params);
    return await this.httpClient.get<T>(`${this.url}${queryString}`).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  private jsonToQueryString(params) {
    let queryString = '';
    Object.keys(params).forEach((key) => {
      queryString = queryString.concat(`&${key}=${params[key]}`);
    });
    return queryString;
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message : error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    alert(errMsg);
    return throwError(errMsg);
  }
}
