import ArmarioController from "../src/controller/ArmarioController.controller";

test("Testando se o controller dos armario consegue criar um armario", async () => {
  const armarioController = new ArmarioController();
  await armarioController.createArmario({
    nome: "Armario Alpha",
    descricao: "Armario da cozinha",
  });
  await armarioController.createArmario({
    nome: "Armario Beta",
    descricao: "Armario da cozinha",
  });
  await armarioController.createArmario({
    nome: "Gamma",
    descricao: "Armario da cozinha",
  });
  const armariosCriados = await armarioController.buscaTodosArmarios();
  expect(armariosCriados.data.length).toBe(3);
  await armarioController.resetaCollection();
});

test("Testando se o controller dos armario consegue buscar um armário", async () => {
  const armarioController = new ArmarioController();
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
  console.log(buscaArmario);
  await armarioController.resetaCollection();
});
