import { DTOAdicionarProdutoArmarioUseCase } from "../dto/DTOAdicionarProdutoArmarioUseCase.dto";
import { DTOArmario } from "../dto/DTOArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import Armario from "../entity/Armario.entity";
import Produto from "../entity/Produto.entity";
import IArmarioRepository from "../interface/IArmarioRepository.interface";
import Response from "../service/Response.service";

export default class ArmarioUseCase {
  armarioRepository: IArmarioRepository;
  response: Response;
  constructor(armarioRepository: IArmarioRepository) {
    this.armarioRepository = armarioRepository;
    this.response = new Response();
  }
  async createArmario(payload: DTOArmario) {
    const createArmario = await this.armarioRepository.createArmario(
      new Armario(payload.nome, payload.descricao ?? "")
    );
    if (createArmario.success == 1) {
      return this.response.success(createArmario.data);
    }
    return this.response.fail(400, "Erro ao criar o armário!");
  }
  async adicionarProdutoAoArmario(
    payload: DTOAdicionarProdutoArmarioUseCase
  ): Promise<DTOResponse> {
    const produto = new Produto(
      payload.produto.nome,
      payload.produto.dataValidade
    );
    const adicionaProdutoResp =
      await this.armarioRepository.adicionarProdutoAoArmario({
        produto: {
          nome: produto.nome,
          dataValidade: produto.dataValidade,
          quantidade: payload.produto.quantidade,
          expired: produto.expired,
        },
        armario: payload.armario,
      });
    if (adicionaProdutoResp.success == 1) {
      return this.response.success("Produto adicionado com sucesso!");
    }
    return this.response.fail(400, "Erro ao adicionar o produto no armario");
  }
  async buscaTodosArmarios(): Promise<DTOResponse> {
    return await this.armarioRepository.buscaTodosArmarios();
  }
  async buscaArmarioById(payload: { id: string }): Promise<DTOResponse> {
    const respBuscaId = await this.armarioRepository.buscaArmarioById({
      id: payload.id,
    });
    if (respBuscaId.success == 1) {
      return this.response.success(respBuscaId.data);
    }
    return this.response.fail(400, "Erro ao buscar o armário!");
  }
  async buscaArmario(payload: DTOArmario): Promise<DTOResponse> {
    const buscaArmario = await this.armarioRepository.buscaArmario(payload);
    if (buscaArmario.success == 1) return this.response.success(buscaArmario);
    return this.response.fail(400, "Erro ao buscar o armário");
  }
}
