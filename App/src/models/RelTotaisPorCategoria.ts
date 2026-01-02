
export interface RelTotaisPorCategoria {
  categorias: RelatorioCategoriaItem[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}

interface RelatorioCategoriaItem {
  idCategoria: number;
  descricaoCategoria: string;
  finalidade: string;
  totalReceitas: number;
  totalDespesas: number;
}

