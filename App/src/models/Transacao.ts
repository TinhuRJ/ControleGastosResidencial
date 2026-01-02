import { TipoTransacaoEnum } from "../enums/TipoTransacaoEnum";

export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacaoEnum;
  idCategoria: number;
  idPessoa: number;
}
