import { useEffect, useState } from "react";
import type { Categoria } from "../../models/Categoria.ts";
import { CategoriaService } from "../../services/CategoriaService";
import "../../styles/global.css";

export default function GetCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem] = useState("");

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const response = await CategoriaService.listar();

      if (!response.data.sucesso) {
        setErro(response.data.menssagem ?? "Erro ao carregar categorias");
        return;
      }

      setCategorias(response.data.objeto);
    } catch {
      setErro("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);
  

  if (loading) return <p className="mensagem">Carregando...</p>;
  if (erro) return <p className="mensagem erro">{erro}</p>;

  return (
    <div className="container">
      <h2>Categorias</h2>
      {mensagem && <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>{mensagem}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Finalidade</th>            
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id}>
              <td>{c.descricao}</td>
              <td>{c.finalidade}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
