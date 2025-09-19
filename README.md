# Microblock

Microservicio en NestJS para publicar y consultar platos en la blockchain. Diseñado para integrarse con aplicaciones empresariales que requieren trazabilidad e inmutabilidad de datos nutricionales.

## Características

- `POST /blockchain/publicar`: publica un plato en la blockchain
- `GET /blockchain`: obtiene todos los platos registrados
- `GET /blockchain/:id`: obtiene un plato por su ID
- Codificación base64 de nutrientes para asegurar integridad
- Conexión dinámica con contrato inteligente vía Ethers.js
- Validación estricta de DTOs con `class-validator`

## Ejemplo de payload

```json
{
  "idPlato": "PLT-001",
  "nombrePlato": "Ensalada Proteica",
  "idEmpresa": "EMP-123",
  "nutrientes": {
    "nombre": "Ensalada Proteica",
    "macronutrientes": "Proteínas, Carbohidratos",
    "micronutrientes": "Vitaminas A, C, E",
    "nutrientes": "Fibra, Omega 3",
    "grasas": "Grasas saludables",
    "otros": "Sin gluten"
  },
  "keyword": "ensalada"
}
```

## Arquitectura
- NestJS como framework principal
- Ethers.js para conexión con blockchain
- DTOs validados para asegurar estructura de datos
- Modularidad: separación entre lógica, conexión y mapeo
- Configuración vía .env para RPC, contrato y clave privada

### Environment variables

Environment variables need be into a folder env/ at the root path, and you can divide by .dev.env or .prod.env

```bash
NODE_ENV=your_enviroment_dev_or_prod
PORT=port
PUERTO=for_confirm_port


#DATABASE VARIABLE - if you want add a db for improve
DATABASE_HOST=
DATABASE_PORT=
DATABASE_URL=

#BLOCKCHAIN
BLOCK_PRIVATE_KEY=your_private_key_wallet
BLOCK_RPC_URL=rpc_url_blockchain
BLOCK_HASH_CONTRACT=hash_of_contract_deploy
```

## Install
```bash
git clone https://github.com/DanyElPollo/microblock.git
cd microblock
npm install
```

## Run
```bash
npm run start:dev
```