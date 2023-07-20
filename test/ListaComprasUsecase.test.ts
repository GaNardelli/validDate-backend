import MemoryListaComprasRepository from "../src/repository/MemoryListaComprasRepository.repository";
import ListaCompras from "../src/usecase/ListaCompras.usecase";

const listaComprasRepository = new MemoryListaComprasRepository();
const listaComprasUseCase = new ListaCompras(listaComprasRepository);

test("Criar uma lista de compras", async () => {
  const response = await listaComprasUseCase.criarListaCompras(
    "Lista de compras teste"
  );
  expect(response.statusCode).toBe(200);
});

test("Adicionando um produto na lista de compras", async () => {
  const responseListaCompras = await listaComprasUseCase.criarListaCompras(
    "Lista de compras teste"
  );
  const response = await listaComprasUseCase.adicionarProdutoLista({
    produto: {
      nome: "Manga",
      quantidade: 33,
    },
    listaCompra: {
      id: responseListaCompras.data.id,
    },
  });
  expect(response.statusCode).toBe(200);
});

test("Buscando os produtos da lista de compras", async () => {
  const responseListaCompras = await listaComprasUseCase.criarListaCompras(
    "Lista de compras teste"
  );
  await listaComprasUseCase.adicionarProdutoLista({
    produto: {
      nome: "Manga",
      quantidade: 33,
    },
    listaCompra: {
      id: responseListaCompras.data.id,
    },
  });
  await listaComprasUseCase.adicionarProdutoLista({
    produto: {
      nome: "Jaca",
      quantidade: 33,
    },
    listaCompra: {
      id: responseListaCompras.data.id,
    },
  });
  const response = await listaComprasUseCase.buscaProdutosListaCompras();
  expect(
    response.data.find(
      (elem: { id: any }) => elem.id === responseListaCompras.data.id
    ).produtosListados.length
  ).toBeGreaterThan(1);
});
