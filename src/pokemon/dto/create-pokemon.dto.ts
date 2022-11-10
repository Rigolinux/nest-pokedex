import { IsString, MinLength, IsPositive, IsInt } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  no: number;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name is too short' })
  name: string;
}
