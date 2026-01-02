import { useState } from "react";
import type { Pessoa } from "../../models/pessoa.ts";
import { pessoaService } from "../../services/pessoaService.ts";
import "../../styles/global.css";

export default function CreatePessoa() {
  const [form, setForm] = useState<Omit<Pessoa, "id">>({ nome: "", idade: 0 });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const criarPessoa = async () => {
    if (!form.nome || form.idade <= 0) {
      setMensagem("Nome e idade devem ser preenchidos corretamente.");
      return;
    }

    try {
      setLoading(true);
      const response = await pessoaService.criar(form);

      if (!response.data.sucesso) {
        setMensagem(response.data.menssagem ?? "Erro ao criar pessoa");
        return;
      }

      setMensagem("Pessoa criada com sucesso!");
      setForm({ nome: "", idade: 0 });
    } catch {
      setMensagem("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Criar Pessoa</h2>
      {mensagem && (
        <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
          {mensagem}
        </p>
      )}
      <div className="form-group">
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div style={{ flex: 0.3, display: "flex", flexDirection: "column" }}>
          <label htmlFor="idade">Idade</label>
          <input
            id="idade"
            type="number"
            placeholder="Idade"
            value={form.idade}
            onChange={(e) =>
              setForm({ ...form, idade: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <button className="btn-criar" onClick={criarPessoa} disabled={loading}>
        {loading ? "Criando..." : "Criar"}
      </button>
    </div>
  );
}
