function verAnimal() {
  window.location.href = "../Animais.ong/pesquisa.html";
}

function sair() {
  const confirmar = confirm("Deseja sair da sua conta?");

  if (confirmar) {
    sairDaConta();
  }
}
