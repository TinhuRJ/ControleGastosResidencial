import { useEffect, useState } from "react";
import "../../styles/global.css";
import type { Pessoa } from "../../models/Pessoa.ts";
import { pessoaService } from "../../services/PessoaService.ts";

export default function GetPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      const response = await pessoaService.listar();

      if (!response.data.sucesso) {
        setErro(response.data.menssagem ?? "Erro ao carregar pessoas");
        return;
      }

      setPessoas(response.data.objeto);
    } catch {
      setErro("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const deletarPessoa = async (id?: number) => {
    if (!id) return;
    const confirm = window.confirm("Tem certeza que deseja deletar esta pessoa?");
    if (!confirm) return;

    try {
      setLoading(true);
      await pessoaService.deletar(id);
      setMensagem("Pessoa deletada com sucesso!");
      await carregarPessoas();
    } catch {
      setMensagem("Erro ao deletar pessoa");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="mensagem">Carregando...</p>;
  if (erro) return <p className="mensagem erro">{erro}</p>;

  return (
    <div className="container">
      <h2>Pessoas</h2>
      {mensagem && <p className="mensagem sucesso">{mensagem}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td>
                <button
                  className="btn-deletar"
                  onClick={() => deletarPessoa(p.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
