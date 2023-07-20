import { DTOAdicionarProdutoArmario } from "../dto/DTOAdicionarProdutoArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import Armario from "../entity/Armario.entity";
import IArmarioRepository from "../interface/IArmarioRepository.interface";
import Response from "../service/Response.service";

export default class MemoryArmarioRepository implements IArmarioRepository {
  armarios: Armario[];
  response: Response;
  constructor() {
    this.armarios = [];
    this.response = new Response();
  }
  async buscaArmario(payload: {
    nome: string;
    descricao: string;
  }): Promise<DTOResponse> {
    const buscaArmarioNome = this.armarios.find(
      (elem) => elem.nome === payload.nome
    );
    if (!buscaArmarioNome) {
      return this.response.fail(300, buscaArmarioNome);
    }
    return this.response.success(buscaArmarioNome);
  }
  async buscaArmarioById(payload: { id: string }): Promise<DTOResponse> {
    const buscaArmarioId = this.armarios.find((elem) => elem.id == payload.id);
    if (!buscaArmarioId) {
      return this.response.fail(400, "Erro ao buscar o armario");
    }
    return this.response.success(buscaArmarioId);
  }
  async buscaTodosArmarios(): Promise<DTOResponse> {
    return this.response.success(this.armarios);
  }
  async adicionarProdutoAoArmario(
    payload: DTOAdicionarProdutoArmario
  ): Promise<DTOResponse> {
    const armarioParaAdicionar = this.armarios.find(
      (elem) => elem.id == payload.armario.id
    );
    if (!armarioParaAdicionar) {
      return this.response.fail(400, "Erro ao adicionar o produto ao armario");
    }
    armarioParaAdicionar.produtosDoArmario.push(payload.produto);
    return this.response.success("Produto adicionado com sucesso!");
  }
  async createArmario(armario: Armario): Promise<DTOResponse> {
    this.armarios.push(armario);
    return this.response.success({ id: armario.id });
  }
  async resetDB(): Promise<any> {
    this.armarios = [];
    return 1;
  }
}
