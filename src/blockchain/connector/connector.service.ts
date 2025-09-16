import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class ConnectorService {

  constructor(private config: ConfigService) { }

  async createConn(rpcUrl: string, contractAddress: string, abi: any, useSigner = false) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);

      const privateKey = this.config.get<string>('config.wallet_private_key');

      if (!privateKey || typeof privateKey !== 'string') {
        throw new Error('🔐 Clave privada no definida o inválida en el entorno');
      }

      const signer = useSigner
        ? new ethers.Wallet(String(privateKey), provider)
        : provider;

      const contract = new ethers.Contract(contractAddress, abi, signer);
      return contract;
    } catch (error) {
      throw new Error('Error al conectar con el contrato: ' + error);
    }
  }
}
