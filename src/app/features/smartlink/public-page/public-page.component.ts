import { Component, OnInit } from '@angular/core';
import { SupabaseService, LandingConfig } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss'],
  standalone: false,
})
export class PublicPageComponent implements OnInit {

  title = '';
  cover = '';
  urls = {
    spotify: '',
    youtube: '',
    facebook: '',
    youtubemusic: ''
  };
  sidebarOpen = false;
  noData = false;
  cargando = true;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      const config: LandingConfig = await this.supabaseService.getConfig();

      if (!config) {
        this.noData = true;
        return;
      }

      this.title         = config.title || '';
      this.cover         = config.cover_image_url || '';
      this.urls.spotify  = config.spotify_url || '';
      this.urls.youtube  = config.youtube_url || '';
      this.urls.facebook = config.facebook_url || '';
      this.urls.youtubemusic = config.youtube_music_url || '';

    } catch (e) {
      console.error('Error cargando smartlink:', e);
      this.noData = true;
    } finally {
      this.cargando = false;
    }
  }

  abrir(url: string) {
    if (url) window.open(url, '_blank');
  }
}
