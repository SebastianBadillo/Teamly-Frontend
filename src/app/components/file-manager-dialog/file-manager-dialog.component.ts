import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileService } from '../../services/file/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-manager-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './file-manager-dialog.component.html',
  styleUrl: './file-manager-dialog.component.scss'
})
export class FileManagerDialogComponent {
  fileForm: FormGroup;
  selectedFile!: File;
  files: any[] = [];

  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FileManagerDialogComponent>
  ) {
    this.fileForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadFiles();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const description = this.fileForm.value.description;
    const path = 'general'; // Podrías cambiar esto según usuario/sala

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('path', path);
    formData.append('description', description);

    this.fileService.uploadFile(formData).subscribe({
      next: () => {
        this.snackBar.open('Archivo subido', 'OK', { duration: 2000 });
        this.loadFiles();
        this.fileForm.reset();
      },
      error: () => this.snackBar.open('Error al subir', 'Cerrar')
    });
  }

  loadFiles() {
    this.fileService.getAllFiles().subscribe({
      next: (res) => {
        if (res == null) {
          this.files = [];
        }
        this.files = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al cargar archivos', 'Cerrar');
      }
    });
  }

  downloadFile(id: number) {
    this.fileService.downloadFile(id).subscribe((blob: Blob | MediaSource) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `archivo-${id}`;
      a.click();
    });
  }

  deleteFile(id: number) {
    this.fileService.deleteFile(id).subscribe(() => {
      this.snackBar.open('Archivo eliminado', 'OK', { duration: 2000 });
      this.files = this.files.filter(file => file.id !== id);
      this.loadFiles();
    });
  }
  closeDialog() {
    // Aquí puedes implementar la lógica para cerrar el diálogo si es necesario
    console.log('Cerrar diálogo');
    this.dialogRef.close();
  }
}
