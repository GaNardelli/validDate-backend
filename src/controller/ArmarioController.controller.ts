import { DTOArmario } from "../dto/DTOArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import IArmarioRepository from "../interface/IArmarioRepository.interface";
import ArmarioUseCase from "../usecase/ArmarioUseCase.usecase";
import Response from "../service/Response.service";
import MongoArmarioRepository from "../repository/MongoArmarioRepository.repository";
import { DTOAdicionarProdutoArmarioUseCase } from "../dto/DTOAdicionarProdutoArmarioUseCase.dto";

export default class ArmarioController {
  armarioRepository: IArmarioRepository;
  armarioUseCase: ArmarioUseCase;
  response: Response;
  constructor() {
    this.armarioRepository = new MongoArmarioRepository();
    this.armarioUseCase = new ArmarioUseCase(this.armarioRepository);
    this.response = new Response();
  }

  async adicionarProdutoArmario(
    payload: DTOAdicionarProdutoArmarioUseCase
  ): Promise<DTOResponse> {
    try {
      return await this.armarioUseCase.adicionarProdutoAoArmario({
        produto: payload.produto,
        armario: payload.armario,
      });
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }

  async createArmario(payload: DTOArmario): Promise<DTOResponse> {
    try {
      return await this.armarioUseCase.createArmario({
        nome: payload.nome,
        descricao: payload.descricao,
      });
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }

  async buscaTodosArmarios(): Promise<DTOResponse> {
    try {
      return await this.armarioUseCase.buscaTodosArmarios();
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }

  async buscaArmarioById(payload: { id: string }): Promise<DTOResponse> {
    try {
      return await this.armarioUseCase.buscaArmarioById({ id: payload.id });
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }

  async resetaCollection(): Promise<any> {
    try {
      return await this.armarioRepository.resetDB();
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }

  async buscaArmario(payload: DTOArmario): Promise<DTOResponse> {
    try {
      return await this.armarioUseCase.buscaArmario({
        nome: payload.nome,
        descricao: payload.descricao,
      });
    } catch {
      return this.response.fail(
        500,
        "Algum problema aconteceu, tente novamente mais tarde!"
      );
    }
  }
}
