import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // the id is not necessary because it is created automatically by mongodb

  //use prop to add more caracteristics to the field for example the type or if it is required or its unique?
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
