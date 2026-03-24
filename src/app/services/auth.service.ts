import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private supabaseService: SupabaseService) {}

  async login(email: string, password: string) {
    const { data, error } = await this.supabaseService.login(email, password);
    if (error) throw error;
    return data;
  }

  async getUser() {
    const { data } = await this.supabaseService.getSession();
    return data.session?.user ?? null;
  }

  async logout() {
    await this.supabaseService.logout();
  }

  async isLoggedIn(): Promise<boolean> {
    const { data } = await this.supabaseService.getSession();
    return !!data.session;
  }
}