import { DTOAdicionarProdutoArmario } from "../dto/DTOAdicionarProdutoArmario.dto";
import { DTOArmario } from "../dto/DTOArmario.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import Armario from "../entity/Armario.entity";

export default interface IArmarioRepository {
  buscaArmarioById(payload: { id: string }): Promise<DTOResponse>;
  buscaTodosArmarios(): Promise<DTOResponse>;
  adicionarProdutoAoArmario(
    payload: DTOAdicionarProdutoArmario
  ): Promise<DTOResponse>;
  createArmario(armario: Armario): Promise<DTOResponse>;
  buscaArmario(payload: DTOArmario): Promise<DTOResponse>;
  resetDB(): Promise<any>;
}
