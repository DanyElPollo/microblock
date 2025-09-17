import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { AgregarPlatoDto } from './dto/publicar.dto';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) { }

  @Post('publicar')
  async deploy(@Body() dto: AgregarPlatoDto) {
    return this.blockchainService.publicDataBlockchain(dto);
  }

  @Get('')
  async find() {
    return this.blockchainService.getDataBlockchain();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blockchainService.getDataBlockchainById(id);
  }
}
