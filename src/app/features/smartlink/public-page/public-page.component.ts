import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss'],
  standalone:false,
})
export class PublicPageComponent  implements OnInit {

 artist = '';
  song = '';
  cover = '';
  urls: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('artist');

    const data = localStorage.getItem('smartlink_data');

    if (data) {
      const parsed = JSON.parse(data);

      if (parsed.slug === slug) {
        this.artist = parsed.artist;
        this.song = parsed.song;
        this.cover = parsed.cover;
        this.urls = parsed.urls;
      }
    }
  }

  abrir(url: string) {
    window.open(url, '_blank');
  }

}