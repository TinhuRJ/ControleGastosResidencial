
export interface RelTotaisPorPessoa {
  pessoas: RelTotaisPorPessoaItem[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}

interface RelTotaisPorPessoaItem {
  idPessoa: number;
  nomePessoa: string;
  totalReceitas: number;  
  totalDespesas: number;
}

