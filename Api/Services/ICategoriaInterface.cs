using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;

namespace ControleGastosResidencial.Services
{
    public interface ICategoriaInterface
    {
        Task<ApiResponse<List<CategoriaModel>>> GetCategorias();
        Task<ApiResponse<List<CategoriaModel>>> CreateCategoria(CategoriaModel Categoria);
        Task<ApiResponse<object>> GetRelatorioTotaisPorCategoria();
    }
}
