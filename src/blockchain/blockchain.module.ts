import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { BlockchainController } from './blockchain.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConnectorModule } from './connector/connector.module';
// const abi = require('../../contracts/PlatosContract.json')


@Module({
  imports: [PrismaModule, ConnectorModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule { }
