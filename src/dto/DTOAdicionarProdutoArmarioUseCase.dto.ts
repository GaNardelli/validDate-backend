export type DTOAdicionarProdutoArmarioUseCase = {
  produto: {
    nome: string;
    dataValidade: Date;
    quantidade: number;
  };
  armario: { id: string };
};
