import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

import { ConfigModule } from '@nestjs/config';

// import the mongoose module
import { MongooseModule } from '@nestjs/mongoose';

//entity
import { PokemonSchema, Pokemon } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
