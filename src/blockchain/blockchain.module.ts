import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { ConnectorModule } from './connector/connector.module';
import { BlockchainMessageController } from './blockchain.message.controller';


@Module({
  imports: [ConnectorModule],
  controllers: [BlockchainController, BlockchainMessageController],
  providers: [BlockchainService],
})
export class BlockchainModule { }
