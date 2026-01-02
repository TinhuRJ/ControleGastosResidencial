using System.Text.Json.Serialization;

namespace ControleGastosResidencial.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoTransacaoEnum
    {
        Despesa = 1,
        Receita = 2
    }
}
