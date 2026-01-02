import axios from "axios";
import type { Categoria } from "../models/Categoria";


interface ApiResponse<T> {
  sucesso: boolean;
  menssagem?: string;
  objeto: T;
}

const API_URL = "https://localhost:7173/api/Categoria";

export const CategoriaService = {
  listar: () =>
    axios.get<ApiResponse<Categoria[]>>(`${API_URL}/GetCategorias`),

  criar: (categoria: Categoria) =>
    axios.post<ApiResponse<Categoria>>(`${API_URL}/CreateCategoria`, categoria),

  relatorio: () =>
    axios.get<ApiResponse<object>>(`${API_URL}/GetRelatorioTotaisPorCategoria`)
};
