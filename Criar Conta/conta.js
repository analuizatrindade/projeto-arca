let tipoUsuario = "adotante";

const adotante = document.getElementById("adotante");
const resgatista = document.getElementById("resgatista");
const cadastroForm = document.getElementById("cadastroForm");

adotante.addEventListener("click", function () {
  tipoUsuario = "adotante";

  adotante.classList.add("ativo");
  resgatista.classList.remove("ativo");
});

resgatista.addEventListener("click", function () {
  tipoUsuario = "resgatista";

  resgatista.classList.add("ativo");
  adotante.classList.remove("ativo");
});

cadastroForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmarSenha").value;

  if (!nome || !email || !senha || !confirmar) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não coincidem!");
    return;
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    senha: senha,
    tipo: tipoUsuario
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Conta criada com sucesso!");

  window.location.href = "../Login/login.html";
});

function voltarLogin() {
  window.location.href = "../Login/login.html";
}