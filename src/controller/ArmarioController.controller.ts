import { DTOArmario } from "../dto/DTOArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import IArmarioRepository from "../interface/IArmarioRepository.interface";
import ArmarioUseCase from "../usecase/ArmarioUseCase.usecase";
import Response from "../service/Response.service";
import MongoArmarioRepository from "../repository/MongoArmarioRepository.repository";

export default class ArmarioController {
  armarioRepository: IArmarioRepository;
  armarioUseCase: ArmarioUseCase;
  response: Response;
  constructor() {
    this.armarioRepository = new MongoArmarioRepository();
    this.armarioUseCase = new ArmarioUseCase(this.armarioRepository);
    this.response = new Response();
  }

  async createArmario(payload: DTOArmario): Promise<DTOResponse> {
    return await this.armarioUseCase.createArmario({
      nome: payload.nome,
      descricao: payload.descricao,
    });
  }

  async buscaTodosArmarios(): Promise<DTOResponse> {
    return await this.armarioUseCase.buscaTodosArmarios();
  }

  async buscaArmarioById(payload: { id: string }): Promise<DTOResponse> {
    return await this.armarioUseCase.buscaArmarioById({ id: payload.id });
  }

  async resetaCollection(): Promise<any> {
    return await this.armarioRepository.resetDB();
  }

  async buscaArmario(payload: DTOArmario): Promise<DTOResponse> {
    return await this.armarioUseCase.buscaArmario({
      nome: payload.nome,
      descricao: payload.descricao,
    });
  }
}
