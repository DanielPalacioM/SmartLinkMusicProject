import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private supabase: SupabaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return from(this.supabase.getSession()).pipe(
      map(({ data }) => {
        if (data.session) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}