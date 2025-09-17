import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
  port: process.env.PUERTO ? parseInt(process.env.PUERTO, 10) : 3000,
  wallet_private_key: process.env.BLOCK_PRIVATE_KEY,
  rpc: process.env.BLOCK_RPC_URL,
  contract_hash: process.env.BLOCK_HASH_CONTRACT,
}));