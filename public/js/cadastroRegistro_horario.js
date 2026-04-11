// Preencher horário atual ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  var agora = new Date();
  
  var dia = String(agora.getDate()).padStart(2, "0");
  var mes = String(agora.getMonth() + 1).padStart(2, "0");
  var ano = agora.getFullYear();
  var hora = String(agora.getHours()).padStart(2, "0");
  var min = String(agora.getMinutes()).padStart(2, "0");
  var seg = String(agora.getSeconds()).padStart(2, "0");
  
  var horarioFormatado = dia + "/" + mes + "/" + ano + " " + hora + ":" + min + ":" + seg;
  
  document.getElementById("horarioExibicao").value = horarioFormatado;
  document.getElementById("horario").value = agora.toISOString();
});
