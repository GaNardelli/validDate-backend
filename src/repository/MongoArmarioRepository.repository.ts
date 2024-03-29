import { DTOAdicionarProdutoArmario } from "../dto/DTOAdicionarProdutoArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import Armario from "../entity/Armario.entity";
import IArmarioRepository from "../interface/IArmarioRepository.interface";
import * as dotenv from "dotenv";
import MongoConnection from "../service/MongoConnection.service";
import Response from "../service/Response.service";
import { DTOArmario } from "../dto/DTOArmario.dto";

export default class MongoArmarioRepository implements IArmarioRepository {
  mongoConnection: MongoConnection;
  response: Response;
  constructor() {
    dotenv.config();
    this.mongoConnection = new MongoConnection(
      process.env.ARMARIOS_COLLECTION_NAME ?? ""
    );
    this.response = new Response();
  }
  async buscaArmario(payload: DTOArmario): Promise<DTOResponse> {
    const collection = await this.mongoConnection._connectToDB();
    const findArmario = await collection.findOne({
      nome: payload.nome,
    });
    if (findArmario) return this.response.success(findArmario);
    return this.response.fail(400, findArmario);
  }
  async resetDB(): Promise<any> {
    const collection = await this.mongoConnection._connectToDB();
    return await collection.deleteMany({});
  }
  async buscaArmarioById(payload: { id: string }): Promise<DTOResponse> {
    const collection = await this.mongoConnection._connectToDB();
    const findId = await collection.findOne({ id: payload.id });
    return this.response.success(findId);
  }
  async buscaTodosArmarios(): Promise<DTOResponse> {
    const collection = await this.mongoConnection._connectToDB();
    const respFindAll = await collection.find({}).toArray();
    return this.response.success(respFindAll);
  }
  async adicionarProdutoAoArmario(
    payload: DTOAdicionarProdutoArmario
  ): Promise<DTOResponse> {
    const collection = await this.mongoConnection._connectToDB();
    const findAndUpdate = await collection.updateOne(
      { id: payload.armario.id },
      {
        $push: {
          produtosDoArmario: {
            nome: payload.produto.nome,
            dataValidade: payload.produto.dataValidade,
            expired: payload.produto.expired,
            quantidade: payload.produto.quantidade,
          },
        },
      }
    );
    if (!findAndUpdate) return this.response.fail(300, findAndUpdate);
    return this.response.success(findAndUpdate);
  }
  async createArmario(armario: Armario): Promise<DTOResponse> {
    const collection = await this.mongoConnection._connectToDB();
    const respCreate = await collection.insertOne({
      nome: armario.nome,
      descricao: armario.descricao,
      id: armario.id,
      produtosDoArmario: [],
    });
    if (!respCreate) return this.response.fail(400, "Erro ao criar o armario");
    return this.response.success(respCreate);
  }
  async _connectToDB(): Promise<any> {
    return this.mongoConnection._connectToDB();
  }
}
