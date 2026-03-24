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

  async guardarSmartlink(data: any) {
    return this.supabase
      .from('smartlinks')
      .upsert(data, { onConflict: 'slug' });
  }

  async obtenerSmartlink(slug: string) {
    return this.supabase
      .from('smartlinks')
      .select('*')
      .eq('slug', slug)
      .single();
  }
}