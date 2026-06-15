function verAnimal() {
  window.location.href = "../Catalogo Animais/catalogo.html";
}

function sair() {
  const confirmar = confirm("Deseja sair da sua conta?");

  if (confirmar) {
    sairDaConta();
  }
}
