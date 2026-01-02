import { useEffect, useState } from "react";
import { CategoriaService } from "../../services/CategoriaService";
import "../../styles/global.css";
import type { RelTotaisPorCategoria } from "../../models/RelTotaisPorCategoria";

export default function RelatorioCategorias() {
  const [relatorio, setRelatorio] = useState<RelTotaisPorCategoria | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarRelatorio = async () => {
      try {
        setLoading(true);
        const response = await CategoriaService.relatorio();

        if (!response.data.sucesso || !response.data.objeto) {
          setErro(response.data.menssagem ?? "Erro ao carregar relatório");
          return;
        }

        setRelatorio(response.data.objeto as RelTotaisPorCategoria);
      } catch {
        setErro("Erro ao conectar com a API");
      } finally {
        setLoading(false);
      }
    };

    carregarRelatorio();
  }, []);

  if (loading) return <p className="mensagem">Carregando...</p>;
  if (erro) return <p className="mensagem erro">{erro}</p>;
  if (!relatorio) return null;

  return (
    <div className="container">
      <h2>Relatório por Categoria</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Finalidade</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {relatorio.categorias.map(c => (
            <tr key={c.idCategoria}>
              <td>{c.descricaoCategoria}</td>
              <td>{c.finalidade}</td>
              <td>{c.totalReceitas}</td>
              <td>{c.totalDespesas}</td>
              <td>{c.totalReceitas - c.totalDespesas}</td>
            </tr>
          ))}
          <tr style={{ fontWeight: "bold" }}>
            <td>Total Geral</td>
            <td>-</td>
            <td>{relatorio.totalGeral.totalReceitas}</td>
            <td>{relatorio.totalGeral.totalDespesas}</td>
            <td>{relatorio.totalGeral.saldoLiquido}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
