import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header class="bg-slate-700 text-3xl p-6">Airport Search App</header>
    <div class="my-8 mx-auto w-[70%] bg-slate-600 p-4 rounded-2xl">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
