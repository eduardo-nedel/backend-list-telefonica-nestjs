import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class PersonSchema {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  @MaxLength(18)
  @Matches(
    /\+{1}[0-9]{2}\s{1}[0-9]{2}\s{1}[0-9]{1}\s{1}[0-9]{4}\-{1}[0-9]{4}/gm,
    {
      message: 'Informe um telefone no formato: +00 00 0 0000-0000',
    },
  )
  telefone?: string;
}
