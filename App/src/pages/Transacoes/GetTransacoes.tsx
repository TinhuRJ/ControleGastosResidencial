import { useEffect, useState } from "react";
import type { Transacao } from "../../models/Transacao";
import { TransacaoService } from "../../services/TransacaoService";
import "../../styles/global.css";

export default function GetTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem] = useState("");

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      const response = await TransacaoService.listar();

      if (!response.data.sucesso) {
        setErro(response.data.menssagem ?? "Erro ao carregar transações");
        return;
      }

      setTransacoes(response.data.objeto);
    } catch {
      setErro("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  if (loading) return <p className="mensagem">Carregando...</p>;
  if (erro) return <p className="mensagem erro">{erro}</p>;

  return (
    <div className="container">
      <h2>Transações</h2>
      {mensagem && <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>{mensagem}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Id Categoria</th>
            <th>Id Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id}>
              <td>{t.descricao}</td>
              <td>{t.valor.toFixed(2)}</td>
              <td>{t.tipo}</td>
              <td>{t.idCategoria}</td>
              <td>{t.idPessoa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
