using ControleGastosResidencial.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidencial.Models
{
    public class RelTotaisPorPessoaModel
    {
        [Key]
        public int IdPessoa { get; set; }
        public string NomePessoa { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
