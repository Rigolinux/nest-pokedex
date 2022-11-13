import { Injectable } from '@nestjs/common';

//import  axios

import { Pokerequest } from './interface/responsepoke.interface';

//import the pokemon entity
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

//import the pokemon service

import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    //delete database
    await this.pokemonModel.deleteMany();
    //get api
    const data = await this.http.get<Pokerequest>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );
    const arrayofpokemon = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = parseInt(segments[segments.length - 2], 10);
      const pokemon: CreatePokemonDto = {
        no,
        name,
      };
      //push to array
      //arrayofpokemon.push(this.pokemonModel.create(pokemon));
      arrayofpokemon.push(pokemon);
    });
    //save to database
    //await Promise.all(arrayofpokemon);
    await this.pokemonModel.insertMany(arrayofpokemon);

    return 'seed done';
  }
}
