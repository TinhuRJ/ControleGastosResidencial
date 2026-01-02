using ControleGastosResidencial.Enums;
using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidencial.Models
{
    public class CategoriaModel
    {
        [Key]
        public int Id { get; set; }
        public string Descricao { get; set; }
        [EnumDataType(typeof(FinalidadeCategoriaEnum))]
        public FinalidadeCategoriaEnum Finalidade { get; set; }        
    }
}
