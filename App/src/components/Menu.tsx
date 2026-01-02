import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li className="has-submenu">
          <Link to="#">Pessoas</Link>
          <ul className="submenu">
            <li>
              <Link to="/pessoas/createpessoa">Criar Pessoa</Link>
            </li>
            <li>
              <Link to="/pessoas/getpessoas">Consultar Pessoas</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <Link to="#">Categorias</Link>
          <ul className="submenu">
            <li>
              <Link to="/categorias/createcategoria">Criar Categoria</Link>
            </li>
            <li>
              <Link to="/categorias/getcategorias">Consultar Categorias</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <Link to="#">Transações</Link>
          <ul className="submenu">
            <li>
              <Link to="/transacoes/createtransacao">Criar Transação</Link>
            </li>
            <li>
              <Link to="/transacoes/gettransacoes">Consultar Transação</Link>
            </li>
          </ul>
        </li>
        <li className="has-submenu">
          <Link to="#">Relatórios</Link>
          <ul className="submenu">
            <li>
              <Link to="/pessoas/getrelatoriototaisporpessoa">Por Pessoa</Link>
            </li>
            <li>
              <Link to="/categorias/getrelatoriototaisporcategoria">Por Categoria</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
