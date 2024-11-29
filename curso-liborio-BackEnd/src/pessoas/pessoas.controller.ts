import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PessoaService } from './pessoas.service';

@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Post()
  create(@Body() body: any) {
    if (!body.nomeCompleto || !body.email || !body.cidadeId) {
      return {
        error: 'Os campos nomeCompleto, email e cidadeId são obrigatórios.',
      };
    }
    return this.pessoaService.create(body);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('size') size: number = 5) {
    return this.pessoaService.findAll(page, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoaService.findOne(Number(id));
  }

  @Put(':id') 
  update(@Param('id') id: string, @Body() body: any) {
    return this.pessoaService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoaService.remove(Number(id));
  }
}
