import { DTOAddProdutoListaCompra } from "../dto/DTOAddProdutoListaCompra.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import ListaComprasEntity from "../entity/ListaComprasEntity.entity";
import IListaComprasRepository from "../interface/IListaComprasRepository.interface";
import Response from "../service/Response.service";

export default class MemoryListaComprasRepository
  implements IListaComprasRepository
{
  listaCompras: ListaComprasEntity[];
  response: Response;
  constructor() {
    this.listaCompras = [];
    this.response = new Response();
  }
  async criarListaCompras(payload: ListaComprasEntity): Promise<DTOResponse> {
    this.listaCompras.push(payload);
    return this.response.success(
      this.listaCompras.find((elem) => elem.id === payload.id)
    );
  }
  async buscaProdutosListaCompras(): Promise<DTOResponse> {
    return this.response.success(this.listaCompras);
  }
  async adicionaProdutoListaCompras(
    payload: DTOAddProdutoListaCompra
  ): Promise<DTOResponse> {
    const listaToAdd = this.listaCompras.find(
      (elem) => elem.id === payload.listaCompra.id
    );
    if (listaToAdd) {
      listaToAdd.produtosListados.push(payload.produto);
      return this.response.success("Produto listado com sucesso");
    }
    return this.response.fail(300, "Erro ao listar o produto");
  }
}
