import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OcrResponse } from '../interfaces/OcrResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumeOcrService {

  private baseUrl: string = 'https://api.ocr.space/parse/image';

  constructor(
    private http: HttpClient
  ) { }

  sendDocument(url: string): Observable<OcrResponse>{
    const formData: FormData = new FormData();
    formData.append('apikey', '3c2571f94f88957');
    formData.append('url', url);
    formData.append('language', 'spa');

    return this.http.post<OcrResponse>(this.baseUrl, formData);
  }
}
