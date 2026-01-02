using ControleGastosResidencial.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidencial.Models
{
    public class TransacaoModel
    {
        [Key]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        [EnumDataType(typeof(TipoTransacaoEnum))]
        public TipoTransacaoEnum Tipo { get; set; }        
        public int IdCategoria { get; set; }
        public int IdPessoa { get; set; }
    }
}
