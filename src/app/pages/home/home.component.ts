import { Component } from '@angular/core';
import { NetworkPriceComponent } from '../../components/network-price/network-price.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NetworkPriceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
