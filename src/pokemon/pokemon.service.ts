import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

// Import the Pokemon model
import { Pokemon } from './entities/pokemon.entity';

//mongoose
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (err) {
      this.Handleexception(err);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  /* 
  In this case you can search of three ways: 
  1: by id of mongoDB
  2: by number of the pokemon
  3: by name of the pokemon
  */
  async findOne(term: string) {
    let pokemon: Pokemon;
    //check the term is a number
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //check the id of mongodb is valid
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //search the pokemon by name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    //check if the pokemons was found or not
    if (!pokemon) throw new NotFoundException(`Pokemon not found`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //check if the pokemon exists
    const pokemon = await this.findOne(term);
    //update the pokemon
    if (updatePokemonDto.name)
      pokemon.name = updatePokemonDto.name.toLowerCase();
    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (err) {
      this.Handleexception(err);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new NotFoundException(`Pokemon not found`);
    return;
  }

  private Handleexception(err: any) {
    if (err.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists in database ${JSON.stringify(err.keyValue)}`,
      );
      console.log(err);
      throw new InternalServerErrorException('Check the servers logs');
    }
  }
}
