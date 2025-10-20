import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import ABI from '../../contracts/PlatosContract.json';
import { AgregarPlatoDto } from './dto/publicar.dto';
import { ConnectorService } from './connector/connector.service';
import { ConfigService } from '@nestjs/config';
import { mapPlatosFromArray, mapPlatoFromArray } from "./mappers/plato.mapper"

@Injectable()
export class BlockchainService {
  private readonly rpcUrl: string;
  private readonly contractAddress: string;
  private readonly abi = ABI;

  constructor(private readonly connector: ConnectorService, private readonly config: ConfigService) {
    const rpc = this.config.get<string>('config.rpc');
    const hash = this.config.get<string>('config.contract_hash');

    if (!rpc || !hash) {
      throw new Error('❌ Variables de entorno faltantes: config.rpc o config.contract_hash');
    }

    this.rpcUrl = rpc;
    this.contractAddress = hash;
  }

  private async conn(useSigner: boolean) {
    try {
      return await this.connector.createConn(
        this.rpcUrl,
        this.contractAddress,
        this.abi,
        useSigner
      );
    } catch (e) {
      throw new Error('❌ Error al conectar con el contrato: ' + e);
    }
  }

  //todos los platos
  async getDataBlockchain() {
    try {
      const contract = await this.conn(false);
      const platos = await contract.obtenerTodosLosPlatos();
      return mapPlatosFromArray(platos);
    } catch (e) {
      throw new Error('❌ Error al conectar con el contrato: ' + e);
    }
  }

  //plato por id
  async getDataBlockchainById(id: string): Promise<AgregarPlatoDto> {
    try {
      const contract = await this.conn(false);
      const plato = await contract.obtenerPlatoPorId(id);
      return mapPlatoFromArray(plato);
    } catch (e) {
      throw new Error('❌ Error al conectar con el contrato: ' + e);
    }
  }

  //publicar plato
  async publicDataBlockchain(dto: AgregarPlatoDto) {
    const contract = await this.conn(true);

    const nutrientesCodificados = Object.entries(dto.nutrientes).reduce((acc, [key, value]) => {
      acc[key] = Buffer.from(value).toString('base64');
      return acc;
    }, {} as Record<string, string>);

    try {
      const tx = await contract.agregarPlato(
        dto.idPlato,
        dto.nombrePlato,
        dto.idEmpresa,
        nutrientesCodificados,
      );

      const receipt = await tx.wait();

      return {
        success: true,
        status: 'success',
        message: 'Dish successfully published on blockchain',
        txHash: receipt.hash,
        block: receipt.blockNumber
      };
    } catch (error) {
      return {
        success: false,
        status: 'error',
        message: 'Failed to publish dish to blockchain',
        error: error.reason || error?.message || String(error) || error.receipt
      };
    }
  }
}
