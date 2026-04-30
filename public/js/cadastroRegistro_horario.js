// Preencher horário atual ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  // Obtemos a data e hora atual
  var agora = new Date();

  // Pegando os componentes da data e hora
  var dia = String(agora.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for um número abaixo de 10
  var mes = String(agora.getMonth() + 1).padStart(2, '0'); // Mes começa do 0, então somamos 1
  var ano = agora.getFullYear();

  var hora = String(agora.getHours()).padStart(2, '0');
  var min = String(agora.getMinutes()).padStart(2, '0');
  var seg = String(agora.getSeconds()).padStart(2, '0');

  // Formatando a data como "dd/mm/yyyy h:m:s"
  var horarioFormatado = dia + "/" + mes + "/" + ano + " " + hora + ":" + min + ":" + seg;

  // Exibindo a data formatada no input de id "horarioExibicao"
  document.getElementById("horarioExibicao").value = horarioFormatado;

  const pad = n => String(n).padStart(2, '0');

  const local =
    `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())} ` +
    `${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`;

  document.getElementById("horario").value = local;
});
