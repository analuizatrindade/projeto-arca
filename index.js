const btnAnimais = document.querySelector(".btn-laranja");
const btnDenuncia = document.querySelector(".btn-branco");
const btnMenuDenuncia = document.querySelector(".menu button");
const linksCards = document.querySelectorAll(".card a");

function irParaLogin() {
  const resposta = confirm(
    "Você precisa estar logado para acessar esta funcionalidade.\n\nDeseja ir para a tela de login?"
  );

  if (resposta) {
    window.location.href = "./Login/login.html";
  }
}

if (btnAnimais) btnAnimais.addEventListener("click", irParaLogin);
if (btnDenuncia) btnDenuncia.addEventListener("click", irParaLogin);
if (btnMenuDenuncia) btnMenuDenuncia.addEventListener("click", irParaLogin);

linksCards.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    irParaLogin();
  });
});