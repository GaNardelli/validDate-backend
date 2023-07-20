import ArmarioController from "../src/controller/ArmarioController.controller";
import MongoArmarioRepository from "../src/repository/MongoArmarioRepository.repository";
const mongoRepository = new MongoArmarioRepository();
test("Testando se o controller dos armario consegue criar um armario", async () => {
  const armarioController = new ArmarioController();
  await mongoRepository.resetDB();
  let resp = await armarioController.createArmario({
    nome: "Armario Alpha",
    descricao: "Armario da cozinha",
  });
  expect(resp.statusCode).toBe(200);
  resp = await armarioController.createArmario({
    nome: "Armario Beta",
    descricao: "Armario da cozinha",
  });
  expect(resp.statusCode).toBe(200);
  resp = await armarioController.createArmario({
    nome: "Gamma",
    descricao: "Armario da cozinha",
  });
  expect(resp.statusCode).toBe(200);
  const armariosCriados = await armarioController.buscaTodosArmarios();
  if (armariosCriados.data.length > 0) {
    expect(armariosCriados.statusCode).toBe(200);
  } else {
    expect(armariosCriados.statusCode).toBe(300);
  }
});

test("Testando se o controller dos armario consegue buscar um armário", async () => {
  const armarioController = new ArmarioController();
  await mongoRepository.resetDB();
  await armarioController.createArmario({
    nome: "Foo",
    descricao: "Bar",
  });
  await armarioController.createArmario({
    nome: "Fazilasd",
    descricao: "Sadasr",
  });
  const buscaArmario = await armarioController.buscaArmario({
    nome: "Foo",
  });
  if (buscaArmario.data.length > 0) {
    expect(buscaArmario.statusCode).toBe(400);
  } else {
    expect(buscaArmario.statusCode).toBe(200);
  }
});

test("Adicionando produto ao armario", async () => {
  const armarioController = new ArmarioController();
  await mongoRepository.resetDB();
  const armarioTeste = await armarioController.createArmario({
    nome: "Teste produto armario",
  });
  expect(armarioTeste.statusCode).toBe(200);
  const idArmariotesteReps = await armarioController.buscaArmario({
    nome: "Teste produto armario",
  });
  const respAddProduto = await armarioController.adicionarProdutoArmario({
    produto: {
      nome: "Produto Teste",
      dataValidade: new Date(2022, 7, 7),
      quantidade: 5,
    },
    armario: {
      id: idArmariotesteReps.data.data.id,
    },
  });
  expect(respAddProduto.statusCode).toBe(200);
});
