import { useEffect, useState } from "react";
import type { Transacao } from "../../models/Transacao";
import type { Categoria } from "../../models/Categoria";
import { FinalidadeCategoriaEnum } from "../../enums/FinalidadeCategoriaEnum";
import { TipoTransacaoEnum } from "../../enums/TipoTransacaoEnum";
import { TransacaoService } from "../../services/TransacaoService";
import { CategoriaService } from "../../services/CategoriaService";
import "../../styles/global.css";
import type { Pessoa } from "../../models/pessoa";
import { pessoaService } from "../../services/pessoaService";

export default function CreateTransacao() {
  const [form, setForm] = useState<Omit<Transacao, "id">>({
    descricao: "",
    valor: 0,
    tipo: TipoTransacaoEnum.Despesa,
    idCategoria: 0,
    idPessoa: 0
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [tipoReadonly, setTipoReadonly] = useState(false);

  const carregarDados = async () => {
    try {
      const catResp = await CategoriaService.listar();
      if (catResp.data.sucesso) setCategorias(catResp.data.objeto);

      const pesResp = await pessoaService.listar();
      if (pesResp.data.sucesso) setPessoas(pesResp.data.objeto);
    } catch { /* empty */ }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const criarTransacao = async () => {
    const pessoaSelecionada = pessoas.find(p => p.id === form.idPessoa);
    if (!form.descricao || !form.valor || !form.tipo || !form.idCategoria || !pessoaSelecionada) {
      setMensagem("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    try {
      setLoading(true);
      const response = await TransacaoService.criar(form);
      if (!response.data.sucesso) {
        setMensagem(response.data.menssagem ?? "Erro ao criar transação");
        return;
      }

      setMensagem("Transação criada com sucesso!");
      setForm({
        descricao: "",
        valor: 0,
        tipo: TipoTransacaoEnum.Despesa,
        idCategoria: 0,
        idPessoa: 0
      });
      setTipoReadonly(false);
    } catch {
      setMensagem("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  const categoriasFiltradas = categorias.filter(c => {
    if (form.tipo === TipoTransacaoEnum.Despesa) return c.finalidade !== FinalidadeCategoriaEnum.Receita;
    if (form.tipo === TipoTransacaoEnum.Receita) return c.finalidade !== FinalidadeCategoriaEnum.Despesa;
    return true;
  });

  const handlePessoaChange = (id: number) => {
    const pessoaSelecionada = pessoas.find(p => p.id === id);
    if (pessoaSelecionada && pessoaSelecionada.idade < 18) {
      setForm({ ...form, idPessoa: id, tipo: TipoTransacaoEnum.Despesa });
      setTipoReadonly(true);
    } else {
      setForm({ ...form, idPessoa: id });
      setTipoReadonly(false);
    }
  };

  return (
    <div className="container">
      <h2>Criar Transação</h2>

      {mensagem && (
        <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>{mensagem}</p>
      )}

      <div className="form-group">
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            type="text"
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="valor">Valor</label>
          <input
            id="valor"
            type="number"
            placeholder="Valor"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) })}
          />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="idPessoa">Pessoa</label>
          <select
            id="idPessoa"
            value={form.idPessoa}
            onChange={(e) => handlePessoaChange(parseInt(e.target.value))}
          >
            <option value={0}>Selecione</option>
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.idade})
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoTransacaoEnum })}
            disabled={tipoReadonly}
          >
            {Object.values(TipoTransacaoEnum).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label htmlFor="idCategoria">Categoria</label>
          <select
            id="idCategoria"
            value={form.idCategoria}
            onChange={(e) => setForm({ ...form, idCategoria: parseInt(e.target.value) })}
          >
            <option value={0}>Selecione</option>
            {categoriasFiltradas.map(c => (
              <option key={c.id} value={c.id}>{c.descricao}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn-criar" onClick={criarTransacao} disabled={loading}>
        {loading ? "Criando..." : "Criar"}
      </button>
    </div>
  );
}
