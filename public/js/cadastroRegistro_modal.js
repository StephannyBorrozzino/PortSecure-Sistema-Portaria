// Funcionamento correto do modal com as mensagens
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('modalAlerta');
  var close = document.getElementById('modalClose');
  if (modal && close) {
    close.addEventListener('click', function () {
      modal.classList.remove('show');
      var nome = document.getElementById('nome-usuario');
      var cpf = document.getElementById('cpf-usuario');
      if (nome) nome.value = '';
      if (cpf) cpf.value = '';
    });
  }

// Função para o botão ao lado da movimentação limpar os rádios selecionados
  var radios = document.querySelectorAll('input[name="movimentacao"]');
  radios.forEach(function (radio) {
    radio.addEventListener('mousedown', function () {
      this.wasChecked = this.checked;
    });
    radio.addEventListener('click', function () {
      if (this.wasChecked) {
        this.checked = false;
        this.wasChecked = false;
      }
    });
  });

  var limpar = document.getElementById('limparMovimentacao');
  if (limpar) {
    limpar.addEventListener('click', function () {
      radios.forEach(function (rad) {
        rad.checked = false;
      });
    });
  }
});
