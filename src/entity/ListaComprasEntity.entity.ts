import { v4 as uuidv4 } from "uuid";
import ProdutoLista from "./ProdutoLista.entity";
export default class ListaComprasEntity {
  id: string;
  produtosListados: ProdutoLista[];
  constructor(private nome: string) {
    this.nome = nome;
    this.id = this._generateIDListaCompras();
    this.produtosListados = [];
  }
  _generateIDListaCompras(): string {
    return uuidv4();
  }
}
