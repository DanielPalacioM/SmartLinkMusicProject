import { Component } from '@angular/core';
import { Router } from '@angular/router';

// 👇 IMPORTA TU SERVICIO
import { login } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  loading: boolean = false;

  constructor(private router: Router) {}

  async login() {
    try {
      this.loading = true;

      // 🔐 LOGIN REAL CON SUPABASE
      await login(this.email, this.password);

      alert('Login exitoso 🔥');

      this.router.navigate(['/admin']);

    } catch (error: any) {
      console.error(error);
      alert('Error: ' + error.message);
    } finally {
      this.loading = false;
    }
  }
}
