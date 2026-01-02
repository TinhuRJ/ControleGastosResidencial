using System.Text.Json.Serialization;

namespace ControleGastosResidencial.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FinalidadeCategoriaEnum
    {
        Despesa = 1,
        Receita = 2,
        Ambas = 3
    }
}
