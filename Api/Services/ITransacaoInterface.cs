using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;

namespace ControleGastosResidencial.Services
{
    public interface ITransacaoInterface
    {        
        Task<ApiResponse<List<TransacaoModel>>> GetTransacoes();
        Task<ApiResponse<List<TransacaoModel>>> CreateTransacao(TransacaoModel Transacao);
    }
}
