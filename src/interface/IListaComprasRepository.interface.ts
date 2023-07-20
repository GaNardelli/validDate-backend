import { DTOAddProdutoListaCompra } from "../dto/DTOAddProdutoListaCompra.dto";
import { DTOListaCompras } from "../dto/DTOListaCompras.dto";
import { DTOResponse } from "../dto/DTOResponse.dto";
import ListaComprasEntity from "../entity/ListaComprasEntity.entity";

export default interface IListaComprasRepository {
  listaCompras: ListaComprasEntity[];
  buscaProdutosListaCompras(): Promise<DTOResponse>;
  adicionaProdutoListaCompras(
    payload: DTOAddProdutoListaCompra
  ): Promise<DTOResponse>;
  criarListaCompras(payload: ListaComprasEntity): Promise<DTOResponse>;
}
