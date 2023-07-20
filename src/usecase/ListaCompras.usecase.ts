import { DTOResponse } from "../dto/DTOResponse.dto";
import Response from "../service/Response.service";
import IListaComprasRepository from "../interface/IListaComprasRepository.interface";
import ListaComprasEntity from "../entity/ListaComprasEntity.entity";
import { DTOAddProdutoListaCompra } from "../dto/DTOAddProdutoListaCompra.dto";

export default class ListaCompras {
  response: Response;
  listaComprasRepository: IListaComprasRepository;
  constructor(listaComprasRepository: IListaComprasRepository) {
    this.response = new Response();
    this.listaComprasRepository = listaComprasRepository;
  }
  async criarListaCompras(nome: string): Promise<DTOResponse> {
    const listaCompras = new ListaComprasEntity(nome);
    return this.listaComprasRepository.criarListaCompras(listaCompras);
  }
  async adicionarProdutoLista(
    payload: DTOAddProdutoListaCompra
  ): Promise<DTOResponse> {
    return await this.listaComprasRepository.adicionaProdutoListaCompras(
      payload
    );
  }
  async buscaProdutosListaCompras(): Promise<DTOResponse> {
    return this.listaComprasRepository.buscaProdutosListaCompras();
  }
}
