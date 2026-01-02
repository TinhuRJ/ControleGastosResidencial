import axios from "axios";
import type { Pessoa } from "../models/Pessoa";


interface ApiResponse<T> {
  sucesso: boolean;
  menssagem?: string;
  objeto: T;
}

const API_URL = "https://localhost:7173/api/Pessoa";

export const pessoaService = {
  listar: () =>
    axios.get<ApiResponse<Pessoa[]>>(`${API_URL}/GetPessoas`),

  criar: (pessoa: Pessoa) =>
    axios.post<ApiResponse<Pessoa>>(`${API_URL}/CreatePessoa`, pessoa),

  deletar: (id: number) =>
    axios.delete<ApiResponse<void>>(`${API_URL}/DeletePessoa/${id}`),

  relatorio: () =>
    axios.get<ApiResponse<object>>(`${API_URL}/GetRelatorioTotaisPorPessoa`)
};
