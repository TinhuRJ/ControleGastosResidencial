using System.ComponentModel.DataAnnotations;

namespace ControleGastosResidencial.Models
{
    public class PessoaModel
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
    }
}
