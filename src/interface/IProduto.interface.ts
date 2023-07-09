export default class IProduto {
  nome: string;
  dataValidade: Date;
  expired: number;
  constructor(nome: string, dataValidade: Date) {
    this.nome = nome;
    this.dataValidade = dataValidade;
    this.expired = this._isExpired();
  }

  private _isExpired(): number {
    const today = new Date();
    return this.dataValidade.getTime() > today.getTime() ? 0 : 1;
  }
}
