export type DTOAddProdutoListaCompra = {
  produto: {
    nome: string;
    quantidade: number;
  };
  listaCompra: {
    id: string;
  };
};
