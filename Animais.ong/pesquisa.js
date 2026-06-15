const animaisPadrao = [
  {
    id: 1,
    nome: "Bolinha",
    tipo: "Cachorro",
    porte: "Médio",
    sexo: "Macho",
    idade: "2 anos",
    descricao: "Dócil e brincalhão, adora pessoas.",
    status: "Para Adoção",
    cidade: "Serra",
    imagem: "https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png?crop=1&resize=1212,909",
    fixo: true
  },
  {
    id: 2,
    nome: "Mimi",
    tipo: "Gato",
    porte: "Pequena",
    sexo: "Fêmea",
    idade: "1 ano",
    descricao: "Amorosa e independente.",
    status: "Para Adoção",
    cidade: "Serra",
    imagem: "https://media.istockphoto.com/id/2226755176/pt/foto/black-cat-chilling-on-a-gray-sofa-and-looking-curious-at-camera-horizontal-image-with.jpg?s=612x612&w=0&k=20&c=EKeyHKnWxgYeEteA8UBJYzSY1VxGeEbsn2PsQ3nvDkA=",
    fixo: true
  }
];

const lista = document.getElementById("listaAnimais");
const buscar = document.getElementById("buscar");
const botoesFiltro = document.querySelectorAll(".filtros button");
const btnCadastrarAnimal = document.getElementById("btnCadastrarAnimal");

let filtroAtual = "todos";

function textoComparacao(valor) {
  return String(valor || "").toLowerCase();
}

function buscarAnimais() {
  const animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
  return [...animaisPadrao, ...animaisSalvos];
}

function mostrarAnimais(listaDeAnimais) {
  lista.innerHTML = "";

  if (listaDeAnimais.length === 0) {
    lista.innerHTML = `<p class="mensagem-vazia">Nenhum animal encontrado.</p>`;
    return;
  }

  listaDeAnimais.forEach(animal => {
    const botoesGerenciar = animal.fixo ? `
      <button type="button" class="btn-bloqueado">Animal padrão</button>
    ` : `
      <div class="botoes-card">
        <button type="button" class="btn-editar" data-id="${animal.id}">Editar</button>
        <button type="button" class="btn-excluir" data-id="${animal.id}">Excluir</button>
      </div>
    `;

    lista.innerHTML += `
      <div class="card" data-id="${animal.id}">
        <div class="conteudo">
          <img src="${animal.imagem}" alt="${animal.nome}">

          <div class="info">
            <span class="status">${animal.status || "Para Adoção"}</span>
            <h3>${animal.nome}</h3>
            <p>${animal.tipo}</p>
            <p>${animal.porte}</p>
            <p>${animal.sexo || "Não informado"}</p>
            <p>${animal.idade}</p>
            <p>${animal.descricao}</p>
          </div>
        </div>

        ${botoesGerenciar}
      </div>
    `;
  });
}

function filtrarAnimais() {
  const texto = textoComparacao(buscar.value);
  const animais = buscarAnimais();

  const filtrados = animais.filter(animal => {
    const combinaPesquisa =
      textoComparacao(animal.nome).includes(texto) ||
      textoComparacao(animal.tipo).includes(texto) ||
      textoComparacao(animal.porte).includes(texto) ||
      textoComparacao(animal.status).includes(texto) ||
      textoComparacao(animal.descricao).includes(texto);

    const combinaFiltro =
      filtroAtual === "todos" ||
      textoComparacao(animal.tipo) === filtroAtual ||
      textoComparacao(animal.porte) === filtroAtual;

    return combinaPesquisa && combinaFiltro;
  });

  mostrarAnimais(filtrados);
}

function editarAnimal(id) {
  const animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
  const animal = animaisSalvos.find(item => item.id == id);

  if (!animal) {
    alert("Esse animal padrão não pode ser editado nessa tela.");
    return;
  }

  animal.nome = prompt("Novo nome:", animal.nome) || animal.nome;
  animal.tipo = prompt("Novo tipo:", animal.tipo) || animal.tipo;
  animal.porte = prompt("Novo porte:", animal.porte) || animal.porte;
  animal.sexo = prompt("Novo sexo:", animal.sexo) || animal.sexo;
  animal.idade = prompt("Nova idade:", animal.idade) || animal.idade;
  animal.status = prompt("Novo status:", animal.status || "Para Adoção") || animal.status;
  animal.cidade = prompt("Nova cidade:", animal.cidade || "Serra") || animal.cidade;
  animal.descricao = prompt("Nova descrição:", animal.descricao) || animal.descricao;
  animal.imagem = prompt("Nova imagem URL:", animal.imagem) || animal.imagem;

  localStorage.setItem("animais", JSON.stringify(animaisSalvos));
  alert("Animal atualizado com sucesso!");
  filtrarAnimais();
}

function excluirAnimal(id) {
  let animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
  const existe = animaisSalvos.some(item => item.id == id);

  if (!existe) {
    alert("Esse animal padrão não pode ser excluído nessa tela.");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja excluir este animal?");

  if (!confirmar) return;

  animaisSalvos = animaisSalvos.filter(item => item.id != id);
  localStorage.setItem("animais", JSON.stringify(animaisSalvos));
  alert("Animal excluído com sucesso!");
  filtrarAnimais();
}

if (btnCadastrarAnimal) {
  btnCadastrarAnimal.addEventListener("click", function() {
    window.location.href = "../Cadastrar Animal/cadastrar.html";
  });
}

buscar.addEventListener("input", filtrarAnimais);

botoesFiltro.forEach(botao => {
  botao.addEventListener("click", function() {
    filtroAtual = this.dataset.filtro;

    botoesFiltro.forEach(item => item.classList.remove("ativo"));
    this.classList.add("ativo");

    filtrarAnimais();
  });
});

lista.addEventListener("click", function(evento) {
  const botaoEditar = evento.target.closest(".btn-editar");
  const botaoExcluir = evento.target.closest(".btn-excluir");

  if (botaoEditar) {
    editarAnimal(botaoEditar.dataset.id);
    return;
  }

  if (botaoExcluir) {
    excluirAnimal(botaoExcluir.dataset.id);
  }
});

filtrarAnimais();
