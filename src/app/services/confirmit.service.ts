import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmitService {

  private baseUrl: string = environment.backEndUrl + 'bard';

  constructor(
    private http: HttpClient
  ) { }

  sendTextToAnalize(text: string): Observable<any>{
    return this.http.post(this.baseUrl, {
      text
    })
  }
}
