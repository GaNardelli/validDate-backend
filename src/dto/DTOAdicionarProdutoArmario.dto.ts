export type DTOAdicionarProdutoArmario = {
  produto: {
    nome: string;
    dataValidade: Date;
    quantidade: number;
    expired: number;
  };
  armario: { id: string };
};
