import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent {

  seccion: string = '';

  urls = {
    spotify: '',
    youtube: '',
    youtubemusic: '',
    facebook: ''
  };

  imagenPreview: any = null;

  mostrarUrls() {
    this.seccion = 'urls';
  }

  mostrarPortada() {
    this.seccion = 'portada';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    console.log('URLs:', this.urls);
    console.log('Imagen:', this.imagenPreview);
    alert('Cambios guardados');
  }

}