using ControleGastosResidencial.DataContext;
using ControleGastosResidencial.Enums;
using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ControleGastosResidencial.Services
{
    public class CategoriaService : ICategoriaInterface
    {
        private readonly ApplicationDbContext _context;
        public CategoriaService(ApplicationDbContext context) 
        {
            _context = context;
        }
        public async Task<ApiResponse<List<CategoriaModel>>> CreateCategoria(CategoriaModel Categoria)
        {
            ApiResponse<List<CategoriaModel>> apiResponse = new ApiResponse<List<CategoriaModel>>();

            try
            {
                if(Categoria == null) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Informar dados!";
                    apiResponse.Sucesso = false;

                    return apiResponse;
                }
                else
                    apiResponse.Menssagem = Categoria.Descricao + " criado com sucesso!";

                _context.Add(Categoria);
                await _context.SaveChangesAsync();

                apiResponse.Objeto = _context.Categorias.ToList();

            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }        
        public async Task<ApiResponse<List<CategoriaModel>>> GetCategorias()
        {
            ApiResponse<List<CategoriaModel>> apiResponse = new ApiResponse<List<CategoriaModel>>();

            try
            {
                apiResponse.Objeto = _context.Categorias.ToList();

                if(apiResponse.Objeto.Count() < 1) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Nenhuma Categoria encontrada!";
                    apiResponse.Sucesso = false;
                }
            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }
        public async Task<ApiResponse<object>> GetRelatorioTotaisPorCategoria()
        {
            ApiResponse<object> apiResponse = new ApiResponse<object>();

            try
            {
                var relatorioPorCategoria =
                    from c in _context.Categorias
                    join t in _context.Transacoes
                        on c.Id equals t.IdCategoria into transacoes
                    select new RelTotaisPorCategoriaModel
                    {
                        IdCategoria = c.Id,
                        DescricaoCategoria = c.Descricao,
                        Finalidade = c.Finalidade,

                        TotalReceitas = transacoes
                            .Where(x => x.Tipo == TipoTransacaoEnum.Receita)
                            .Sum(x => (decimal?) x.Valor) ?? 0,

                        TotalDespesas = transacoes
                            .Where(x => x.Tipo == TipoTransacaoEnum.Despesa)
                            .Sum(x => (decimal?) x.Valor) ?? 0
                    };

                var lista = relatorioPorCategoria.ToList();

                if(lista.Count < 1)
                {
                    apiResponse.Menssagem = "Nenhuma categoria encontrada!";
                    apiResponse.Sucesso = false;
                    return apiResponse;
                }

                apiResponse.Objeto = new
                {
                    Categorias = lista,
                    TotalGeral = new
                    {
                        TotalReceitas = lista.Sum(x => x.TotalReceitas),
                        TotalDespesas = lista.Sum(x => x.TotalDespesas),
                        SaldoLiquido = lista.Sum(x => x.Saldo)
                    }
                };
            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }

    }
}
