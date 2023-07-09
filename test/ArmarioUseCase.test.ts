import Armario from "../src/entity/Armario.entity";
import ArmarioUseCase from "../src/usecase/ArmarioUseCase.usecase";
import MemoryArmarioRepository from "../src/repository/MemoryArmarioRepository.repository";

test("Testando o uso da classe para criar o armário", () => {
  const armario = new Armario("Nome do armario", "Descricao do armario");
  expect(armario.nome).toBe("Nome do armario");
  const armarioRepository = new MemoryArmarioRepository();
  const armarioUseCase = new ArmarioUseCase(armarioRepository);
  armarioUseCase.createArmario({
    nome: "Nome do Armario",
    descricao: "Descricao do armario",
  });
  expect(armarioRepository.armarios.length).toBe(1);
  armarioUseCase.createArmario({
    nome: "Nome do Armario 2",
    descricao: "Descricao do armario 2",
  });
  expect(armarioRepository.armarios.length).toBe(2);
});

test("Testando funcionalidade para adicionar item em um armário vinculado ao id de um armario", () => {
  const armarioRepository = new MemoryArmarioRepository();
  const armarioUseCase = new ArmarioUseCase(armarioRepository);
  armarioUseCase.createArmario(new Armario("Armario 1", "Descricao"));
  armarioUseCase.createArmario({
    nome: "Nome do Armario 2",
    descricao: "Descricao do armario 2",
  });
  armarioUseCase.adicionarProdutoAoArmario({
    produto: {
      nome: "Produto 1",
      dataValidade: new Date(2024, 7, 7),
      quantidade: 3,
    },
    armario: {
      id: armarioRepository.armarios[0].id,
    },
  });
  armarioUseCase.adicionarProdutoAoArmario({
    produto: {
      nome: "Produto 4",
      dataValidade: new Date(2022, 7, 7),
      quantidade: 5,
    },
    armario: {
      id: armarioRepository.armarios[0].id,
    },
  });
  expect(armarioRepository.armarios[0].produtosDoArmario.length).toBe(2);
});

test("Buscando todos os armarios", async () => {
  const armarioRepository = new MemoryArmarioRepository();
  const armarioUseCase = new ArmarioUseCase(armarioRepository);
  armarioUseCase.createArmario({
    nome: "Nome do Armario 1",
    descricao: "Descricao do armario 1",
  });
  armarioUseCase.createArmario({
    nome: "Nome do Armario 2",
    descricao: "Descricao do armario 2",
  });
  const todosArmarios = await armarioUseCase.buscaTodosArmarios();
  expect(todosArmarios.data.length).toBe(2);
});
