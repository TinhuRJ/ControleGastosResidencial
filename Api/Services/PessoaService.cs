using ControleGastosResidencial.DataContext;
using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ControleGastosResidencial.Services
{
    public class PessoaService : IPessoaInterface
    {
        private readonly ApplicationDbContext _context;
        public PessoaService(ApplicationDbContext context) 
        {
            _context = context;
        }
        public async Task<ApiResponse<List<PessoaModel>>> CreatePessoa(PessoaModel pessoa)
        {
            ApiResponse<List<PessoaModel>> apiResponse = new ApiResponse<List<PessoaModel>>();

            try
            {
                if(pessoa == null) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Informar dados!";
                    apiResponse.Sucesso = false;

                    return apiResponse;
                }
                else
                    apiResponse.Menssagem = pessoa.Nome + " criado com sucesso!";

                _context.Add(pessoa);
                await _context.SaveChangesAsync();

                apiResponse.Objeto = _context.Pessoas.ToList();

            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }

        public async Task<ApiResponse<List<PessoaModel>>> DeletePessoa(int id)
        {
            ApiResponse<List<PessoaModel>> apiResponse = new ApiResponse<List<PessoaModel>>();

            try
            {
                PessoaModel pessoaBD = _context.Pessoas.AsNoTracking().FirstOrDefault(x => x.Id == id);

                if(pessoaBD == null)
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Nenhuma pessoa encontrada!";
                    apiResponse.Sucesso = false;
                }
                else
                    apiResponse.Menssagem = pessoaBD.Nome+" deletado com sucesso!";

                _context.Pessoas.Remove(pessoaBD);
                await _context.SaveChangesAsync();

                apiResponse.Objeto = _context.Pessoas.ToList();

            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }

        public async Task<ApiResponse<List<PessoaModel>>> GetPessoas()
        {
            ApiResponse<List<PessoaModel>> apiResponse = new ApiResponse<List<PessoaModel>>();

            try
            {
                apiResponse.Objeto = _context.Pessoas.ToList();

                if(apiResponse.Objeto.Count() < 1) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Nenhuma pessoa encontrada!";
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

        public async Task<ApiResponse<object>> GetRelatorioTotaisPorPessoa()
        {
            ApiResponse<object> apiResponse = new ApiResponse<object>();

            try
            {
                var relatorioPorPessoa =
                    from p in _context.Pessoas
                    join t in _context.Transacoes
                        on p.Id equals t.IdPessoa into transacoes
                    select new RelTotaisPorPessoaModel
                    {
                        IdPessoa = p.Id,
                        NomePessoa = p.Nome,
                        TotalReceitas = transacoes
                            .Where(x => x.Tipo == Enums.TipoTransacaoEnum.Receita)
                            .Sum(x => (decimal?) x.Valor) ?? 0,

                        TotalDespesas = transacoes
                            .Where(x => x.Tipo == Enums.TipoTransacaoEnum.Despesa)
                            .Sum(x => (decimal?) x.Valor) ?? 0
                    };

                var lista = relatorioPorPessoa.ToList();

                if(lista.Count < 1)
                {
                    apiResponse.Menssagem = "Nenhum dado encontrado!";
                    apiResponse.Sucesso = false;
                    return apiResponse;
                }

                apiResponse.Objeto = new
                {
                    Pessoas = lista,
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
