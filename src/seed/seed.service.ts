import { Injectable } from '@nestjs/common';

//import  axios
import axios, { AxiosInstance } from 'axios';
import { Pokerequest } from './interface/responsepoke.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance;

  async executeSeed() {
    const { data } = await axios.get<Pokerequest>(
      'https://pokeapi.co/api/v2/pokemon?limit=1',
    );
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = parseInt(segments[segments.length - 2], 10);
      console.log(`No: ${no} Name: ${name}`);
    });
  }
}
