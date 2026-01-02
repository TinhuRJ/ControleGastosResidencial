using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using ControleGastosResidencial.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidencial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaInterface _pessoaInterface;
        public PessoaController(IPessoaInterface pessoaInterface) 
        {
            _pessoaInterface = pessoaInterface;
        }
        [HttpGet("GetPessoas")]
        public async Task<ActionResult<ApiResponse<List<PessoaModel>>>> GetPessoas() 
        {
            return Ok(await _pessoaInterface.GetPessoas());
        }
        [HttpPost("CreatePessoa")]
        public async Task<ActionResult<ApiResponse<List<PessoaModel>>>> CreatePessoa(PessoaModel pessoa)
        {
            return Ok(await _pessoaInterface.CreatePessoa(pessoa));
        }
        [HttpDelete("DeletePessoa/{id}")]
        public async Task<ActionResult<ApiResponse<PessoaModel>>> DeletePessoa(int id)
        {
            ApiResponse<List<PessoaModel>> apiResponse = await _pessoaInterface.DeletePessoa(id);
            return Ok(apiResponse);
        }
        [HttpGet("GetRelatorioTotaisPorPessoa")]
        public async Task<ActionResult<ApiResponse<object>>> GetRelatorioTotaisPorPessoa()
        {
            return Ok(await _pessoaInterface.GetRelatorioTotaisPorPessoa());
        }
    }
}
