using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;

namespace ControleGastosResidencial.Services
{
    public interface IPessoaInterface
    {
        Task<ApiResponse<List<PessoaModel>>> GetPessoas();
        Task<ApiResponse<List<PessoaModel>>> CreatePessoa(PessoaModel pessoa);
        Task<ApiResponse<List<PessoaModel>>> DeletePessoa(int id);
        Task<ApiResponse<Object>> GetRelatorioTotaisPorPessoa();
    }
}
