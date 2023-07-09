import { v4 as uuidv4 } from "uuid";
import { DTOProduto } from "../dto/DTOProduto.dto";

export default class Armario {
  nome: string;
  descricao: string;
  id: string;
  produtosDoArmario: DTOProduto[];
  constructor(nome: string, descricao: string) {
    this.nome = nome;
    this.descricao = descricao;
    this.id = this._generateIDArmario();
    this.produtosDoArmario = [];
  }

  _generateIDArmario(): string {
    return uuidv4();
  }
}
