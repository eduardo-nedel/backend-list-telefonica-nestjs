import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonModel } from 'src/models/person.model';
import { PersonSchema } from 'src/schemas/person.schema';
import { Repository } from 'typeorm';

@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel)
    private personRepository: Repository<PersonModel>,
  ) {}

  @Post()
  public async create(@Body() body: PersonSchema): Promise<PersonModel> {
    return await this.personRepository.save(body);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonSchema,
  ): Promise<PersonModel> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Pessoa não encontrada com o id ${id}`);
    }

    await this.personRepository.update({ id }, body);

    return await this.personRepository.findOne({ where: { id } });
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PersonModel> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Pessoa não encontrada com o id ${id}`);
    }

    return person;
  }

  @Get()
  public async getAll(): Promise<PersonModel[]> {
    return await this.personRepository.find();
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Pessoa não encontrada com o id ${id}`);
    }

    await this.personRepository.delete(id);

    return `A pessoa com o id ${id} foi deletada com sucesso`;
  }
}
