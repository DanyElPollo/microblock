import { IsString } from "class-validator";


export class ConsultarDto {
  @IsString()
  public cliente: string;

  @IsString()
  public contrato: string;

  @IsString()
  public environment?: string;
}
