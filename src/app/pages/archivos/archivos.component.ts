import { Component, OnInit } from '@angular/core';
// forms
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// importar servicio
import { FileServiceService } from '../../services/file-service.service';
import { Files } from '../../Models/Files';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss']
})
export class ArchivosComponent implements OnInit {
  // formgroup
  uploadForm: FormGroup;
  // bandera
  submitted = false;

  public FilesA: Files = {
    id: 0,
    nombreArchivo: '',
    extensionArchivo: '',
    rutaArchivo: '',
    tamanioArchivo: '',
  }
  
  public getFilesAll: any =  [];

  // archivo
  fileUpload: File = null;

  constructor(
    private fservice: FileServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.uploadForm = this.fb.group({
      inputFile: new FormControl(null, Validators.required),
    })

    this.getFilesForAll();
  }

  // convenience getter for easy access to form fields
  get f() { return this.uploadForm.controls; }

  /**
   * 
   */

  onSubmit() {
    this.submitted = true;
    const formData = new FormData();

    if (this.uploadForm.invalid) {
      return;
    }

    formData.append('inputFile', this.fileUpload, this.fileUpload.name);
    this.fservice.uploadFile(formData).subscribe(
      (response) => {
        this.getFilesForAll();
        this.uploadForm.reset();
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * get all files
   */
  getFilesForAll() {
    this.fservice.getImageFromApi().subscribe(response => {
        this.getFilesAll = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * seleccionar archivo
   */
  // seleccionar archivo
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
      // this.form.controls.nombreArchivo.setValue(file);
    }
  }

}
