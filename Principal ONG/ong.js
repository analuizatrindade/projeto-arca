localStorage.setItem("tipoUsuarioAtual", "ong");

const btnCadastrar = document.getElementById("btnCadastrar");
const btnGerenciar = document.getElementById("btnGerenciar");

if (btnCadastrar) {
  btnCadastrar.addEventListener("click", function() {
    window.location.href = "../Cadastrar Animal/cadastrar.html";
  });
}

if (btnGerenciar) {
  btnGerenciar.addEventListener("click", function() {
    window.location.href = "../Animais.ong/pesquisa.html";
  });
}
