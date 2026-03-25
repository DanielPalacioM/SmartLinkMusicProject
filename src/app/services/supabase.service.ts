import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bmwmvxseoobjazbwkrol.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qXtF6iujdkUULp4dIlv5eA_mbYYIK6J';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        detectSessionInUrl: false,
        storageKey: 'smartlink-auth',
        autoRefreshToken: true,
        lock: (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => fn()
      } as any
    });
  }

  async login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async logout() {
    return this.supabase.auth.signOut();
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  // Sube imagen al bucket "covers" y devuelve la URL pública
  async uploadCover(file: File): Promise<string> {
    const fileName = 'cover.jpg';

    const { error } = await this.supabase.storage
      .from('covers')
      .upload(fileName, file, { upsert: true });

    if (error) throw error;

    const { data } = this.supabase.storage
      .from('covers')
      .getPublicUrl(fileName);

    // Fuerza recarga de imagen evitando caché del browser
    return data.publicUrl + '?t=' + Date.now();
  }

  // Lee la fila única de landing_config
  async getConfig() {
    const { data, error } = await this.supabase
      .from('landing_config')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  // Actualiza la fila por ID
  async updateConfig(id: string, payload: Partial<LandingConfig>) {
    const { error } = await this.supabase
      .from('landing_config')
      .update(payload)
      .eq('id', id);

    if (error) throw error;
  }
}

export interface LandingConfig {
  id: string;
  title: string;
  cover_image_url: string;
  spotify_url: string;
  youtube_url: string;
  facebook_url: string;
  youtube_music_url: string;
  updated_at: string;
}
