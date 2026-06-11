document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (usuario === "tutor" && senha === "123456") {
    window.location.href = "../Pagina Tutor/tutor.html";
  } 
  else if (usuario === "Ong" && senha === "ong$-135") {
    window.location.href = "../Principal ONG/ong.html";
  } 
  else {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(function(user) {
      return user.email === usuario && user.senha === senha;
    });

    if (!usuarioEncontrado) {
      alert("Usuário ou senha inválidos!");
      return;
    }

    if (usuarioEncontrado.tipo === "adotante") {
      window.location.href = "../Pagina Tutor/tutor.html";
    } else {
      window.location.href = "../Principal ONG/ong.html";
    }
  }
});

function criarConta() {
  window.location.href = "../Criar Conta/conta.html";
}