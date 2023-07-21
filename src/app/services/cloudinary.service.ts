import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadedFile } from '../interfaces/UploadedFile.interface';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private baseUrl: string = 'https://api.cloudinary.com/v1_1/dql0c5oim/upload';

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: File ): Observable<UploadedFile> {
    const preset = 'zewbgf1x';

    const formData = new FormData();
    formData.append('upload_preset', preset);
    formData.append('file', file);

    return this.http.post<UploadedFile>(this.baseUrl, formData);
  }
}
