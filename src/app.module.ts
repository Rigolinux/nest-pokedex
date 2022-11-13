/* eslint-disable prettier/prettier */

import { join } from 'path';

import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

//env config
import { ConfigModule } from '@nestjs/config';
import { envVarsSchema } from './config/joi.validation';
import { EnvConfig } from './config/app.config';

//import modules
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';





@Module({
  imports: [
  ConfigModule.forRoot(
      {
        load:[ EnvConfig ],
        validationSchema: envVarsSchema
      }
    ),
    PokemonModule,SeedModule,
    ServeStaticModule.forRoot({
      //use static sites in the apllication
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
}
