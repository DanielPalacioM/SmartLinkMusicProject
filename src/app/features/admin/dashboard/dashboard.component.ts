import { Component, OnInit } from '@angular/core';
import { SupabaseService, LandingConfig } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {

  seccion: string = 'info';
  configId: string = '';
  guardando: boolean = false;

  // Campos info
  title: string = '';

  // URLs
  urls = {
    spotify: '',
    youtube: '',
    youtubemusic: '',
    facebook: ''
  };

  // Portada
  previewImage: string = '';
  selectedFile: File | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      const config: LandingConfig = await this.supabaseService.getConfig();
      this.configId = config.id;
      this.title = config.title || '';
      this.previewImage = config.cover_image_url || 'assets/default-cover.jpg';
      this.urls.spotify = config.spotify_url || '';
      this.urls.youtube = config.youtube_url || '';
      this.urls.youtubemusic = config.youtube_music_url || '';
      this.urls.facebook = config.facebook_url || '';
    } catch (e) {
      console.error('Error cargando config:', e);
    }
  }

  mostrarSeccion(sec: string) {
    this.seccion = sec;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    // Preview local inmediato
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async guardar() {
    if (!this.configId) {
      alert('No se encontró configuración en la base de datos.');
      return;
    }

    this.guardando = true;

    try {
      if (this.seccion === 'info') {
        await this.supabaseService.updateConfig(this.configId, {
          title: this.title
        });
        alert('Título guardado correctamente ✓');
      }

      if (this.seccion === 'urls') {
        await this.supabaseService.updateConfig(this.configId, {
          spotify_url: this.urls.spotify,
          youtube_url: this.urls.youtube,
          youtube_music_url: this.urls.youtubemusic,
          facebook_url: this.urls.facebook
        });
        alert('URLs guardadas correctamente ✓');
      }

      if (this.seccion === 'portada') {
        if (!this.selectedFile) {
          alert('Selecciona una imagen primero.');
          this.guardando = false;
          return;
        }

        const publicUrl = await this.supabaseService.uploadCover(this.selectedFile);

        await this.supabaseService.updateConfig(this.configId, {
          cover_image_url: publicUrl
        });

        this.previewImage = publicUrl;
        this.selectedFile = null;
        alert('Portada subida correctamente ✓');
      }

    } catch (e: any) {
      console.error(e);
      alert('Error al guardar: ' + e.message);
    } finally {
      this.guardando = false;
    }
  }

  abrirSmartlink() {
  const slug = this.title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  window.open(window.location.origin + '/' + slug, '_blank');
}


}
