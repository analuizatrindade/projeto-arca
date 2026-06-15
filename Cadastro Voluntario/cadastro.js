
document.getElementById("formVoluntario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const funcao = document.getElementById("funcao").value;
  const cidade = document.getElementById("cidade").value.trim();
  const status = document.getElementById("status").value;
  const foto = document.getElementById("foto").value.trim();

  if (!nome || !funcao || !cidade || !status) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const novoVoluntario = {
    id: Date.now(),
    nome: nome,
    funcao: `${funcao} - ${cidade}`,
    cidade: cidade,
    status: status,
    foto: foto || "https://randomuser.me/api/portraits/lego/1.jpg"
  };

  const voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];

  voluntarios.push(novoVoluntario);

  localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

  alert("Voluntário cadastrado com sucesso!");

  document.getElementById("formVoluntario").reset();
});

function voltar() {
  const tipo = typeof tipoUsuarioAtual === "function" ? tipoUsuarioAtual() : "tutor";

  if (tipo === "ong") {
    window.location.href = "../voluntario tutor/voluntario.html";
  } else {
    window.location.href = "../Pagina Tutor/tutor.html";
  }
}