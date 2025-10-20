import { NutrientesCodificadosDto } from "../dto/publicar.dto";

//validacion base64
export function esBase64(str: string): boolean {
  return /^[A-Za-z0-9+/=]{10,}$/.test(str) && str.length % 4 === 0;
}

//decodificacion de nutrientes
export function deconutri(nutrientes: string[]): NutrientesCodificadosDto {
  const decoded = nutrientes.map(value => {
    if (typeof value !== 'string') return value;

    if (esBase64(value)) {
      try {
        return Buffer.from(value, 'base64').toString('utf8');
      } catch {
        return value;
      }
    }

    return value;
  });

  return {
    nombre: decoded[0] || '',
    macronutrientes: decoded[1] || '',
    micronutrientes: decoded[2] || '',
    nutrientes: decoded[3] || '',
    grasas: decoded[4] || '',
  };
}
