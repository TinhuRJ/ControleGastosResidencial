import { Routes, Route } from "react-router-dom";
import GetPessoas from "../pages/Pessoas/GetPessoas.tsx";
import CreatePessoa from "../pages/Pessoas/CreatePessoa.tsx";
import GetCategorias from "../pages/Categorias/GetCategorias.tsx";
import CreateCategoria from "../pages/Categorias/CreateCategoria.tsx";
import GetTransacoes from "../pages/Transacoes/GetTransacoes.tsx";
import CreateTransacao from "../pages/Transacoes/CreateTransacao.tsx";
import RelTotaisPorCategoria from "../pages/Relatorios/RelTotaisPorCategoria.ts";
import RelatorioPessoas from "../pages/Relatorios/RelatorioTotaisPorPessoa.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/pessoas/getpessoas" element={<GetPessoas />} />
      <Route path="/pessoas/createpessoa" element={<CreatePessoa />} />
      <Route path="/categorias/getcategorias" element={<GetCategorias />} />
      <Route path="/categorias/createcategoria" element={<CreateCategoria />} />
      <Route path="/transacoes/gettransacoes" element={<GetTransacoes />} />
      <Route path="/transacoes/createtransacao" element={<CreateTransacao />} />
      <Route path="/categorias/getrelatoriototaisporcategoria" element={<RelTotaisPorCategoria />} />
      <Route path="/pessoas/getrelatoriototaisporpessoa" element={<RelatorioPessoas />} />
    </Routes>
  );
}
