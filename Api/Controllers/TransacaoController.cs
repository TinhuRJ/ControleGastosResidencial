using ControleGastosResidencial.Models;
using ControleGastosResidencial.Response;
using ControleGastosResidencial.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidencial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoInterface _TransacaoInterface;
        public TransacaoController(ITransacaoInterface TransacaoInterface) 
        {
            _TransacaoInterface = TransacaoInterface;
        }
        [HttpGet("GetTransacoes")]
        public async Task<ActionResult<ApiResponse<List<TransacaoModel>>>> GetTransacoes() 
        {
            return Ok(await _TransacaoInterface.GetTransacoes());
        }
        [HttpPost("CreateTransacao")]
        public async Task<ActionResult<ApiResponse<List<TransacaoModel>>>> CreateTransacao(TransacaoModel Transacao)
        {
            return Ok(await _TransacaoInterface.CreateTransacao(Transacao));
        }
    }
}
