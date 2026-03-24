import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss'],
  standalone: false,
})
export class PublicPageComponent implements OnInit {

  artist = '';
  song = '';
  cover = '';
  urls: any = {};
  sidebarOpen = false;
  noData = false;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('artist');

    if (!slug) {
      this.noData = true;
      return;
    }

    // Primero busca en Supabase (fuente de verdad)
    const { data, error } = await this.supabaseService.obtenerSmartlink(slug);

    if (data && !error) {
      this.artist = data.artist;
      this.song = data.song;
      this.cover = data.cover;
      this.urls = data.urls;
      // Actualiza caché local
      localStorage.setItem('smartlink_data', JSON.stringify(data));
      return;
    }

    // Fallback: localStorage
    const cached = localStorage.getItem('smartlink_data');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.slug === slug) {
        this.artist = parsed.artist;
        this.song = parsed.song;
        this.cover = parsed.cover;
        this.urls = parsed.urls;
        return;
      }
    }

    this.noData = true;
  }

  abrir(url: string) {
    window.open(url, '_blank');
  }
}