import { AgregarPlatoDto } from "../dto/publicar.dto";
import { deconutri } from "../helpers/base64.helper";



//Mapeo de un solo plato
export function mapPlatoFromArray(data: any[]): AgregarPlatoDto {
  return {
    idPlato: data[0],
    nombrePlato: data[1],
    idEmpresa: data[2],
    nutrientes: deconutri(data[3]),
    keyword: data[4]
  };
}

//Mapeo de múltiples platos
export function mapPlatosFromArray(data: any[][]): AgregarPlatoDto[] {
  return data.map(plato => mapPlatoFromArray(plato));
}