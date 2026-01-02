using ControleGastosResidencial.DataContext;
using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ControleGastosResidencial.Services
{
    public class TransacaoService : ITransacaoInterface
    {
        private readonly ApplicationDbContext _context;
        public TransacaoService(ApplicationDbContext context) 
        {
            _context = context;
        }
        public async Task<ApiResponse<List<TransacaoModel>>> CreateTransacao(TransacaoModel Transacao)
        {
            ApiResponse<List<TransacaoModel>> apiResponse = new ApiResponse<List<TransacaoModel>>();

            try
            {
                if(Transacao == null) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Informar dados!";
                    apiResponse.Sucesso = false;

                    return apiResponse;
                }
                else
                    apiResponse.Menssagem = Transacao.Descricao + " criado com sucesso!";

                _context.Add(Transacao);
                await _context.SaveChangesAsync();

                apiResponse.Objeto = _context.Transacoes.ToList();

            }
            catch(Exception e)
            {
                apiResponse.Menssagem = e.Message;
                apiResponse.Sucesso = false;
            }

            return apiResponse;
        }              
        public async Task<ApiResponse<List<TransacaoModel>>> GetTransacoes()
        {
            ApiResponse<List<TransacaoModel>> apiResponse = new ApiResponse<List<TransacaoModel>>();

            try
            {
                apiResponse.Objeto = _context.Transacoes.ToList();

                if(apiResponse.Objeto.Count() < 1) 
                {
                    apiResponse.Objeto = null;
                    apiResponse.Menssagem = "Nenhuma Transacao encontrada!";
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
    }
}
