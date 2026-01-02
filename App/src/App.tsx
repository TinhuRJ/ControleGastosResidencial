import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import GetPessoas from "./pages/Pessoas/GetPessoas";
import GetCategoria from "./pages/Categorias/GetCategorias";
import CreatePessoa from "./pages/Pessoas/CreatePessoa";
import CreateCategoria from "./pages/Categorias/CreateCategoria";
import GetTransacoes from "./pages/Transacoes/GetTransacoes";
import CreateTransacao from "./pages/Transacoes/CreateTransacao";
import RelTotaisPorCategoria from "./pages/Relatorios/RelTotaisPorCategoria";
import RelatorioPessoas from "./pages/Relatorios/RelatorioTotaisPorPessoa";


function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/pessoas/getpessoas" element={<GetPessoas />} />
        <Route path="/pessoas/createpessoa" element={<CreatePessoa />} />
        <Route path="/categorias/getcategorias" element={<GetCategoria />} />
        <Route path="/categorias/createcategoria" element={<CreateCategoria />} />
        <Route path="/transacoes/gettransacoes" element={<GetTransacoes />} />
        <Route path="/transacoes/createtransacao" element={<CreateTransacao />} />
        <Route path="/categorias/getrelatoriototaisporcategoria" element={<RelTotaisPorCategoria />} />
        <Route path="/pessoas/getrelatoriototaisporpessoa" element={<RelatorioPessoas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
