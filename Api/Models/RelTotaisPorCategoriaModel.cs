using ControleGastosResidencial.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidencial.Models
{
    public class RelTotaisPorCategoriaModel
    {
        [Key]
        public int IdCategoria { get; set; }
        public string DescricaoCategoria { get; set; }
        public FinalidadeCategoriaEnum Finalidade { get; set; }
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}
