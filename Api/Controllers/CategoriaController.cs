using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using ControleGastosResidencial.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidencial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaInterface _CategoriaInterface;
        public CategoriaController(ICategoriaInterface CategoriaInterface) 
        {
            _CategoriaInterface = CategoriaInterface;
        }
        [HttpGet("GetCategorias")]
        public async Task<ActionResult<ApiResponse<List<CategoriaModel>>>> GetCategorias() 
        {
            return Ok(await _CategoriaInterface.GetCategorias());
        }        
        [HttpPost("CreateCategoria")]
        public async Task<ActionResult<ApiResponse<List<CategoriaModel>>>> CreateCategoria(CategoriaModel Categoria)
        {
            return Ok(await _CategoriaInterface.CreateCategoria(Categoria));
        }
        [HttpGet("GetRelatorioTotaisPorCategoria")]
        public async Task<ActionResult<ApiResponse<object>>> GetRelatorioTotaisPorCategoria()
        {
            return Ok(await _CategoriaInterface.GetRelatorioTotaisPorCategoria());
        }
    }
}
