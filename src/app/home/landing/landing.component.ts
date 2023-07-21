import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cloudinary } from '@cloudinary/url-gen'
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ConfirmitService } from 'src/app/services/confirmit.service';
import { ConsumeOcrService } from 'src/app/services/consume-ocr.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  public fileToOcr!: File;
  public respuesta: string = '';
  
  docForm: FormGroup = this.fb.group({
    file: [ '', [ Validators.required ] ]
  });

  ngOnInit(): void {
    const cld = new Cloudinary({cloud: {cloudName: 'dql0c5oim'}});
  }

  public fileAllowed: Number = 1;

  constructor(
    private fb: FormBuilder,
    private cloudy: CloudinaryService,
    private ocrService: ConsumeOcrService,
    private confirmitService: ConfirmitService
    ){}

  validateFile(e: any){
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileName = this.docForm.controls['file'].value;
    if (fileName) {
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        this.fileAllowed = 2;
        this.fileToOcr = e.target.files.item(0);
      } else {
        this.fileAllowed = 0;
      }
    }
  }

  uploadFile(){
    this.cloudy.uploadFile(this.fileToOcr).subscribe(
      resp =>{
        this.sendFileToOcr(resp.url);
      }
    );
  }

  sendFileToOcr(url: string){
    this.ocrService.sendDocument(url).subscribe(
      resp => {
        this.confirmitService.sendTextToAnalize(resp.ParsedResults[0].ParsedText)
          .subscribe(
            resp => {
              this.respuesta = resp;
            }
          );
      }
    )
  }



  deleteFile(): void{
    this.fileAllowed = 1;
    this.docForm.controls['file']?.setValue('');
  }
}
