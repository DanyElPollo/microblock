import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NutrientesCodificadosDto {
  @IsString()
  nombre: string;

  @IsString()
  macronutrientes: string;

  @IsString()
  micronutrientes: string;

  @IsString()
  nutrientes: string;

  @IsString()
  grasas: string;

}

export class AgregarPlatoDto {
  @IsString()
  idPlato: string;

  @IsString()
  nombrePlato: string;

  @IsString()
  idEmpresa: string;

  @ValidateNested({ each: true })
  @Type(() => NutrientesCodificadosDto)
  nutrientes: NutrientesCodificadosDto;
}
