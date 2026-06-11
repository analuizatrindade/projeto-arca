const botoes = document.querySelectorAll(".opcoes button");
const formDenuncia = document.getElementById("formDenuncia");
const fotoInput = document.getElementById("foto");

let tipoSelecionado = "";
let fotoBase64 = "";

botoes.forEach(function(botao) {
  botao.addEventListener("click", function() {
    botoes.forEach(function(b) {
      b.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    tipoSelecionado = botao.textContent.trim();
  });
});

fotoInput.addEventListener("change", function() {
  const arquivo = fotoInput.files[0];

  if (!arquivo) return;

  const leitor = new FileReader();

  leitor.onload = function(e) {
    fotoBase64 = e.target.result;
  };

  leitor.readAsDataURL(arquivo);
});

formDenuncia.addEventListener("submit", function(e) {
  e.preventDefault();

  const endereco = document.getElementById("endereco").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!tipoSelecionado) {
    alert("Escolha um tipo de ocorrência!");
    return;
  }

  const denuncias = JSON.parse(localStorage.getItem("denuncias")) || [];

  const denuncia = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    tipo: tipoSelecionado,
    endereco,
    descricao,
    foto: fotoBase64,
    data: new Date().toLocaleDateString("pt-BR"),
    status: "Pendente"
  };

  denuncias.push(denuncia);

  localStorage.setItem(
    "denuncias",
    JSON.stringify(denuncias)
  );

  alert("Denúncia enviada com sucesso!");

  formDenuncia.reset();
});