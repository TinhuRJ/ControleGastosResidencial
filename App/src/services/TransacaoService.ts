import axios from "axios";
import type { Transacao } from "../models/Transacao";


interface ApiResponse<T> {
  sucesso: boolean;
  menssagem?: string;
  objeto: T;
}

const API_URL = "https://localhost:7173/api/Transacao";

export const TransacaoService = {
  listar: () =>
    axios.get<ApiResponse<Transacao[]>>(`${API_URL}/GetTransacoes`),

  criar: (Transacao: Transacao) =>
    axios.post<ApiResponse<Transacao>>(`${API_URL}/CreateTransacao`, Transacao)
};
