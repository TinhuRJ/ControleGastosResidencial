import { useState } from "react";
import type { Categoria } from "../../models/Categoria.ts";
import { FinalidadeCategoriaEnum } from "../../enums/FinalidadeCategoriaEnum.ts";
import { CategoriaService } from "../../services/CategoriaService.ts";
import "../../styles/global.css";

export default function CreateCategoria() {
  const [form, setForm] = useState<Omit<Categoria, "id">>({
    descricao: "",
    finalidade: FinalidadeCategoriaEnum.Ambas
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const criarCategoria = async () => {
    if (!form.descricao || !form.finalidade) {
      setMensagem("Descrição e finalidade devem ser preenchidos corretamente.");
      return;
    }

    try {
      setLoading(true);
      const response = await CategoriaService.criar(form);

      if (!response.data.sucesso) {
        setMensagem(response.data.menssagem ?? "Erro ao criar categoria");
        return;
      }

      setMensagem("Categoria criada com sucesso!");
      setForm({
        descricao: "",
        finalidade: FinalidadeCategoriaEnum.Ambas
      });
    } catch {
      setMensagem("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Criar Categoria</h2>

      {mensagem && (
        <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
          {mensagem}
        </p>
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

        <div style={{ flex: 0.5, display: "flex", flexDirection: "column" }}>
          <label htmlFor="finalidade">Finalidade</label>
          <select
            id="finalidade"
            value={form.finalidade}
            onChange={(e) =>
              setForm({ ...form, finalidade: e.target.value as FinalidadeCategoriaEnum })
            }
          >
            {Object.values(FinalidadeCategoriaEnum).map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn-criar" onClick={criarCategoria} disabled={loading}>
        {loading ? "Criando..." : "Criar"}
      </button>
    </div>
  );
}
