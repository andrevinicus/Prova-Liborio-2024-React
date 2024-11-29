import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}


  async create(data: Partial<Pessoa>): Promise<Pessoa> {
    const pessoa = this.pessoaRepository.create(data);
    return this.pessoaRepository.save(pessoa);
  }


  async findAll(page: number, limit: number): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }


  async findOne(id: number): Promise<Pessoa> {
    return this.pessoaRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Pessoa>): Promise<Pessoa> {
    await this.pessoaRepository.update(id, data);
    return this.pessoaRepository.findOne({ where: { id } });
  }

  // Deletar uma pessoa
  async remove(id: number): Promise<void> {
    await this.pessoaRepository.delete(id);
  }
}
