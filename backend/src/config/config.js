import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
  Server: {
    PORT: process.env.SERVER_PORT,
    HOST: process.env.SERVER_HOST,
  },
  Database: {
    name: process.env.DB_NAME,
    ConnectUrl: process.env.DB_CONNECT_URL,
  },
  web3: {
    ContractAddress: process.env.CONTRACT_ADDRESS,
    WebsocketProvider: process.env.WEB3_WEBSOCKET_PROVIDER,
  },
};

export { config };
