import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

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

  constructor(private supabaseService: SupabaseService) {}

  mostrarSeccion(sec: string) {
    this.seccion = sec;
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

  async guardar() {
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

    // Guarda en Supabase
    const { error } = await this.supabaseService.guardarSmartlink(data);

    if (error) {
      alert('Error al guardar: ' + error.message);
      return;
    }

    // Guarda también en localStorage como caché
    localStorage.setItem('smartlink_data', JSON.stringify(data));

    this.linkGenerado = window.location.origin + '/' + slug;

    alert('Guardado correctamente');
  }

  abrirSmartlink() {
    if (this.linkGenerado) {
      window.open(this.linkGenerado, '_blank');
    }
  }

  async ngOnInit() {
    // Intenta cargar desde localStorage primero (más rápido)
    const cached = localStorage.getItem('smartlink_data');
    if (cached) {
      const parsed = JSON.parse(cached);
      this.artist = parsed.artist;
      this.song = parsed.song;
      this.previewImage = parsed.cover;
      this.urls = parsed.urls;
      this.linkGenerado = window.location.origin + '/' + parsed.slug;
    }
  }
}