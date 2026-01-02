using ControleGastosResidencial.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidencial.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<CategoriaModel> Categorias { get; set; }
        public DbSet<PessoaModel> Pessoas { get; set; }
        public DbSet<TransacaoModel> Transacoes { get; set; }
        public object Transacaos { get; internal set; }
    }
}
