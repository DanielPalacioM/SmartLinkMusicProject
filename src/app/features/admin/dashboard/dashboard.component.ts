import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {

  seccion: string = '';

  artist: string = '';
  song: string = '';
  previewImage: any = '';

  linkGenerado: string = '';

  urls = {
    spotify: '',
    youtube: '',
    youtubemusic: '',
    facebook: ''
  };

  mostrarSeccion(sec: string) {
    this.seccion = sec;
  }

  generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
  const slug = this.artist
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  const data = {
    artist: this.artist,
    song: this.song,
    cover: this.previewImage,
    urls: this.urls,
    slug: slug
  };

  localStorage.setItem('smartlink_data', JSON.stringify(data));

  // Codifica los datos en la URL como base64
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  this.linkGenerado = window.location.origin + '/' + slug + '?d=' + encoded;

  alert('Guardado correctamente');
}

  abrirSmartlink() {
    if (this.linkGenerado) {
      window.open(this.linkGenerado, '_blank');
    }
  }

  ngOnInit() {
    const data = localStorage.getItem('smartlink_data');
    if (data) {
      const parsed = JSON.parse(data);
      this.artist = parsed.artist;
      this.song = parsed.song;
      this.previewImage = parsed.cover;
      this.urls = parsed.urls;

      this.linkGenerado = window.location.origin + '/' + parsed.slug;
    }
  }

}