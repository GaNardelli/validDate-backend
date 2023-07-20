import ProdutoLista from "../entity/ProdutoLista.entity";

export type DTOListaCompras = {
  nome: string;
  produtosListados: ProdutoLista[];
  id: string;
};
