import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoaController } from './pessoas.controller';
import { Pessoa } from './pessoa.entity';
import { PessoaService } from './pessoas.service';


@Module({
  imports: [TypeOrmModule.forFeature([Pessoa])],
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
