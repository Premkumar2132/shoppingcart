import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,ContentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
}
