import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlockchainService } from './blockchain.service';
import { AgregarPlatoDto } from './dto/publicar.dto';

@Controller()
export class BlockchainMessageController {
  constructor(private readonly blockchainService: BlockchainService) { }

  @MessagePattern({ cmd: 'create_block' })
  async handleCreateBlock(@Payload() data: AgregarPlatoDto): Promise<any> {
    return this.blockchainService.publicDataBlockchain(data);
  }

  @MessagePattern({ cmd: 'get_block' })
  async handleGetBlock(): Promise<any> {
    return this.blockchainService.getDataBlockchain();
  }

  @MessagePattern({ cmd: 'get_block_by_id' })
  async handleGetBlockById(@Payload() id: string): Promise<any> {
    return this.blockchainService.getDataBlockchainById(id);
  }
}
