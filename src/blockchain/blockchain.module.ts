import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { ConnectorModule } from './connector/connector.module';


@Module({
  imports: [ConnectorModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule { }
