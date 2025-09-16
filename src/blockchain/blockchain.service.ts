import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import ABI from '../../contracts/PlatosContract.json'
import { AgregarPlatoDto } from './dto/publicar.dto';
import { ConnectorService } from './connector/connector.service';
import { ConfigService } from '@nestjs/config';
import { identity } from 'rxjs';

@Injectable()
export class BlockchainService {
  private readonly rpcUrl: string
  private readonly contractAddress: string
  private readonly abi = ABI

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

  async getDataBlockchain() {
    try {
      const contract = await this.conn(false);

      const platos = await contract.obtenerTodosLosPlatos();

      const platosDecodificados = this.decodificarNutrientes(platos);
      return platosDecodificados;
    } catch (e) {
      throw new Error('❌ Error al conectar con el contrato: ' + e);
    }
  }

  async getDataBlockchainById(id: string): Promise<any[]> {
    try {
      const contract = await this.conn(true);

      const plato = await contract.obtenerPlatoPorId(id);
      return this.decodificarNutrientes(plato)
    } catch (e) {
      throw new Error('❌ Error al conectar con el contrato: ' + e);
    }
  }


  async publicDataBlockchain(dto: AgregarPlatoDto) {
    const contract = await this.conn(true);

    const nutrientesCodificados = Object.entries(dto.nutrientes).reduce((acc, [key, value]) => {
      acc[key] = Buffer.from(value).toString('base64');
      return acc;
    }, {} as Record<string, string>);

    const tx = await contract.agregarPlato(
      dto.idPlato,
      dto.nombrePlato,
      dto.idEmpresa,
      nutrientesCodificados,
      dto.keyword
    );

    const receipt = await tx.wait();

    return {
      status: '✅ Plato agregado',
      txHash: receipt.transactionHash,
      block: receipt.blockNumber,
      keyword: dto.keyword,
      nutrientesCodificados
    };
  }

  //funciones escenciales para el trabajo de decodificacion
  private esBase64(str: string): boolean {
    return /^[A-Za-z0-9+/=]{10,}$/.test(str) && str.length % 4 === 0;
  }

  private decodificarNutrientes(platos: any[]): any[] {
    return platos.map(plato => {
      const nutrientes = plato.nutrientes;

      if (!nutrientes || typeof nutrientes !== 'object') return plato;

      const nutrientesDecodificados = Object.fromEntries(
        Object.entries(nutrientes).map(([key, value]) => {
          if (typeof value !== 'string') return [key, value];

          if (this.esBase64(value)) {
            try {
              const decoded = Buffer.from(value, 'base64').toString('utf8');
              return [key, decoded];
            } catch {
              return [key, value];
            }
          }

          return [key, value];
        })
      );

      return {
        ...plato,
        nutrientes: nutrientesDecodificados
      };
    });
  }

  private deconutri(nutrientes: any[]): any[] {
    return nutrientes.map((nutriente) => {
      const nutrientesDecodificados = Object.fromEntries(
        Object.entries(nutriente).map(([key, value]) => {
          if (typeof value !== 'string') return [key, value];

          if (this.esBase64(value)) {
            try {
              const decoded = Buffer.from(value, 'base64').toString('utf8');
              return [key, decoded];
            } catch {
              return [key, value];
            }
          }

          return [key, value];
        })

      )
    }
    )
  }
}
