/* eslint-disable prettier/prettier */

import { join } from 'path';

import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

//import modules
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';




@Module({
  imports: [
    ServeStaticModule.forRoot({
      //use static sites in the apllication
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/NEST-POKEMON'),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
