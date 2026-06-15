const animaisPadrao = [
  {
    id: 1,
    nome: "Bolinha",
    tipo: "Cachorro",
    porte: "Médio",
    idade: "2 anos",
    descricao: "Dócil e brincalhão, adora pessoas.",
    status: "Para Adoção",
    cidade: "Serra",
    sexo: "Macho",
    imagem: "https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png?crop=1&resize=1212,909",
    fixo: true
  },
  {
    id: 2,
    nome: "Mimi",
    tipo: "Gato",
    porte: "Pequena",
    idade: "1 ano",
    descricao: "Amorosa e independente.",
    status: "Para Adoção",
    cidade: "Serra",
    sexo: "Fêmea",
    imagem: "https://media.istockphoto.com/id/2226755176/pt/foto/black-cat-chilling-on-a-gray-sofa-and-looking-curious-at-camera-horizontal-image-with.jpg?s=612x612&w=0&k=20&c=EKeyHKnWxgYeEteA8UBJYzSY1VxGeEbsn2PsQ3nvDkA=",
    fixo: true
  }
];

const lista = document.getElementById("listaAnimais");

let filtroTipo = "todos";
let filtroPorte = "todos";

function buscarAnimais() {
  const animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
  return [...animaisPadrao, ...animaisSalvos];
}

function mostrarAnimais(animais) {
  lista.innerHTML = "";

  if (animais.length === 0) {
    lista.innerHTML = `<p class="mensagem-vazia">Nenhum animal encontrado.</p>`;
    return;
  }

  animais.forEach((animal) => {
    lista.innerHTML += `
      <div class="card" data-id="${animal.id}">
        <div class="card-img">
          <img src="${animal.imagem}" alt="${animal.nome}">
        </div>

        <div class="card-info">
          <span class="status">${animal.status || "Para Adoção"}</span>

          <h3>${animal.nome}</h3>

          <div class="tags">
            <span>🐾 ${animal.tipo}</span>
            <span>${animal.porte}</span>
            <span>${animal.idade}</span>
          </div>

          <p>${animal.descricao}</p>
          <p class="cidade">📍 ${animal.cidade || "Serra"}</p>

          <div class="botoes-card">
            <button type="button" class="btn-detalhes">Ver Detalhes</button>
            <button type="button" class="btn-editar">Editar</button>
            <button type="button" class="btn-excluir">Excluir</button>
            <button type="button" class="btn-coracao">♡</button>
          </div>
        </div>
      </div>
    `;
  });
}

function aplicarFiltros() {
  const animais = buscarAnimais();

  const filtrados = animais.filter((animal) => {
    const passaTipo = filtroTipo === "todos" || animal.tipo === filtroTipo;
    const passaPorte = filtroPorte === "todos" || animal.porte === filtroPorte;

    return passaTipo && passaPorte;
  });

  mostrarAnimais(filtrados);
}

function editarAnimal(id) {
  let animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];

  let animal = animaisSalvos.find((animal) => animal.id == id);

  if (!animal) {
    alert("Esse animal padrão não pode ser editado.");
    return;
  }

  animal.nome = prompt("Novo nome:", animal.nome) || animal.nome;
  animal.tipo = prompt("Novo tipo:", animal.tipo) || animal.tipo;
  animal.porte = prompt("Novo porte:", animal.porte) || animal.porte;
  animal.idade = prompt("Nova idade:", animal.idade) || animal.idade;
  animal.sexo = prompt("Novo sexo:", animal.sexo) || animal.sexo;
  animal.status = prompt("Novo status:", animal.status) || animal.status;
  animal.cidade = prompt("Nova cidade:", animal.cidade) || animal.cidade;
  animal.descricao = prompt("Nova descrição:", animal.descricao) || animal.descricao;
  animal.imagem = prompt("Nova imagem URL:", animal.imagem) || animal.imagem;

  localStorage.setItem("animais", JSON.stringify(animaisSalvos));

  alert("Animal atualizado com sucesso!");
  aplicarFiltros();
}

function excluirAnimal(id) {
  let animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];

  const existe = animaisSalvos.some((animal) => animal.id == id);

  if (!existe) {
    alert("Esse animal padrão não pode ser excluído.");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja excluir este animal?");

  if (!confirmar) return;

  animaisSalvos = animaisSalvos.filter((animal) => animal.id != id);

  localStorage.setItem("animais", JSON.stringify(animaisSalvos));

  alert("Animal excluído com sucesso!");

  aplicarFiltros();
}

document.querySelectorAll(".filtro").forEach((item) => {
  item.addEventListener("click", function () {
    const tipoFiltro = this.getAttribute("data-tipo");
    const valorFiltro = this.getAttribute("data-filtro");

    if (tipoFiltro === "tipo") filtroTipo = valorFiltro;
    if (tipoFiltro === "porte") filtroPorte = valorFiltro;

    document
      .querySelectorAll(`.filtro[data-tipo="${tipoFiltro}"]`)
      .forEach((filtro) => filtro.classList.remove("ativo"));

    this.classList.add("ativo");

    aplicarFiltros();
  });
});

document.addEventListener("click", function (e) {
  const card = e.target.closest(".card");

  if (!card) return;

  const id = card.getAttribute("data-id");

  if (e.target.classList.contains("btn-coracao")) {
    e.stopPropagation();
    e.target.textContent = e.target.textContent === "♡" ? "♥" : "♡";
    return;
  }

  if (e.target.classList.contains("btn-editar")) {
    e.stopPropagation();
    editarAnimal(id);
    return;
  }

  if (e.target.classList.contains("btn-excluir")) {
    e.stopPropagation();
    excluirAnimal(id);
    return;
  }

  if (e.target.classList.contains("btn-detalhes")) {
    e.stopPropagation();
    window.location.href = "../Detalhes Animal/detalhes.html?id=" + id;
    return;
  }
});

aplicarFiltros();