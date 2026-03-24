import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('artist');

    // Intenta leer desde el parámetro ?d= de la URL
    const encoded = this.route.snapshot.queryParamMap.get('d');

    if (encoded) {
      try {
        const parsed = JSON.parse(decodeURIComponent(atob(encoded)));
        this.artist = parsed.artist;
        this.song = parsed.song;
        this.cover = parsed.cover;
        this.urls = parsed.urls;
        // Guarda localmente para próximas visitas
        localStorage.setItem('smartlink_data', JSON.stringify(parsed));
        return;
      } catch (e) {
        console.error('Error decodificando datos de URL');
      }
    }

    // Fallback: localStorage
    const data = localStorage.getItem('smartlink_data');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.slug === slug) {
        this.artist = parsed.artist;
        this.song = parsed.song;
        this.cover = parsed.cover;
        this.urls = parsed.urls;
      } else {
        this.noData = true;
      }
    } else {
      this.noData = true;
    }
  }

  abrir(url: string) {
    window.open(url, '_blank');
  }
}