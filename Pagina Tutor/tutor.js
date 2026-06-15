const btnAnimais = document.querySelector(".btn-laranja");
const btnDenuncia = document.querySelector(".btn-branco");

if (btnAnimais) {
  btnAnimais.addEventListener("click", function() {
    window.location.href = "../Catalogo Animais/catalogo.html";
  });
}

if (btnDenuncia) {
  btnDenuncia.addEventListener("click", function() {
    window.location.href = "../Denuncia/denuncia.html";
  });
}
