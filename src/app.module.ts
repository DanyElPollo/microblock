import { Module } from '@nestjs/common';
import { BlockchainModule } from './blockchain/blockchain.module';
import { ConfigModule } from '@nestjs/config';
import ConfigurationApp from 'config/ConfigurationApp';

@Module({
  imports: [
    BlockchainModule,
    ConfigModule.forRoot({
      envFilePath: [`env/.${process.env.NODE_ENV}.env`],
      load: [ConfigurationApp],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
