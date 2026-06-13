const voluntariosPadrao = [
  {
    nome: "Roberto Martins",
    funcao: "Transporte - Serra - ES",
    status: "Disponível",
    foto: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    nome: "Carlos Mendes",
    funcao: "Resgate - Laranjeiras - ES",
    status: "Disponível",
    foto: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    nome: "Joana Costa",
    funcao: "Cuidadora - Vitória - ES",
    status: "Disponível",
    foto: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    nome: "Laís Gonçalves",
    funcao: "Transporte - Vila Velha - ES",
    status: "Indisponível",
    foto: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const lista = document.getElementById("listaVoluntarios");

function buscarVoluntarios() {
  const voluntariosSalvos =
    JSON.parse(localStorage.getItem("voluntarios")) || [];

  return [...voluntariosPadrao, ...voluntariosSalvos];
}

function carregarVoluntarios() {
  const voluntarios = buscarVoluntarios();

  lista.innerHTML = "";

  voluntarios.forEach(function(voluntario, index) {
    const classeStatus =
      voluntario.status === "Disponível" ? "disponivel" : "indisponivel";

    lista.innerHTML += `
      <div class="voluntario-card">
        <img src="${voluntario.foto}" alt="${voluntario.nome}">

        <div class="info">
          <h3>${voluntario.nome}</h3>
          <p>${voluntario.funcao}</p>
        </div>

        <span class="status ${classeStatus}">
          ${voluntario.status}
        </span>

        <div class="acoes">
          <button class="btn-editar" onclick="editarVoluntario(${index})">
            Editar
          </button>

          <button class="btn-excluir" onclick="excluirVoluntario(${index})">
            Excluir
          </button>

          <button class="btn-chamar" type="button">
            Chamar
          </button>
        </div>
      </div>
    `;
  });
}

function editarVoluntario(index) {
  if (index < voluntariosPadrao.length) {
    alert("Voluntários padrão não podem ser editados.");
    return;
  }

  let voluntariosSalvos =
    JSON.parse(localStorage.getItem("voluntarios")) || [];

  let indiceReal = index - voluntariosPadrao.length;
  let voluntario = voluntariosSalvos[indiceReal];

  voluntario.nome =
    prompt("Nome:", voluntario.nome) || voluntario.nome;

  voluntario.funcao =
    prompt("Função e cidade:", voluntario.funcao) || voluntario.funcao;

  voluntario.status =
    prompt("Status: Disponível ou Indisponível", voluntario.status) || voluntario.status;

  voluntario.foto =
    prompt("URL da foto:", voluntario.foto) || voluntario.foto;

  localStorage.setItem("voluntarios", JSON.stringify(voluntariosSalvos));

  alert("Voluntário atualizado com sucesso!");
  carregarVoluntarios();
}

function excluirVoluntario(index) {
  if (index < voluntariosPadrao.length) {
    alert("Voluntários padrão não podem ser excluídos.");
    return;
  }

  if (!confirm("Deseja excluir este voluntário?")) {
    return;
  }

  let voluntariosSalvos =
    JSON.parse(localStorage.getItem("voluntarios")) || [];

  let indiceReal = index - voluntariosPadrao.length;

  voluntariosSalvos.splice(indiceReal, 1);

  localStorage.setItem("voluntarios", JSON.stringify(voluntariosSalvos));

  alert("Voluntário excluído com sucesso!");
  carregarVoluntarios();
}

function irCadastro() {
  window.location.href = "../Cadastrar Voluntario/cadastro.html";
}

carregarVoluntarios();