import type { FinalidadeCategoriaEnum } from "../enums/FinalidadeCategoriaEnum";

export interface Categoria {
    id?: number;
    descricao: string;
    finalidade: FinalidadeCategoriaEnum;
  }