import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client, createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

@Component({
  selector: 'app-network-price',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './network-price.component.html',
  styleUrls: ['./network-price.component.scss']
})
export class NetworkPriceComponent implements OnInit {
  client: Client;
  ethPrice!: number;
  currentBlock!: string;
  dollarPrice!: number;
  currentGasFee!: number;

  constructor() {
    this.client = createPublicClient({
      chain: mainnet,
      transport: http()
    });
  }

  async ngOnInit() {
    this.currentBlock = await this.getEthereumLastBlock();
    this.currentGasFee = await this.getEthereumGasFee();
    this.dollarPrice = await this.getDollarPrice();
  }

  async getEthereumLastBlock(): Promise<string> {
    let response;
    try {
      response = await this.client.request({
        method: 'eth_getBlockByNumber',
        params: ['latest', true],
      });

      if(!response) {
        return ''
      }

      return parseInt(response.number as string, 16).toString();
    } catch (error) {
      console.error('Error returning ethereum current block', error);
      return '';
    }
  }

  async getEthereumGasFee(): Promise<number> {
    let response;
    try {
      response = await this.client.request({
        method: 'eth_gasPrice'
      });

      if (!response) {
        return 0;
      }

      return parseInt(response as string, 16) / 1e18; // Convert wei to ether and limit to 5 decimal places
    } catch (error) {
      console.error('Error returning the current gas fee', error);
      return 0;
    }
  }

  async getDollarPrice(): Promise<number> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      return data.ethereum.usd;
    } catch (error) {
      console.error('Erro ao buscar o preço do Ethereum em Dólares:', error);
      return 0;
    }
  }
}
