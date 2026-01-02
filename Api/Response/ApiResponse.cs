namespace ControleGastosResidencial.Response
{
    public class ApiResponse<T>
    {
        public T? Objeto { get; set; }
        public string Menssagem { get; set; } = string.Empty;
        public bool Sucesso { get; set; } = true;
    }
}
