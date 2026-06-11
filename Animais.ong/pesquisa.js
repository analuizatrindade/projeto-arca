const animais = [
  {
    nome: "Luna",
    tipo: "Gato",
    porte: "Pequena",
    sexo: "Fêmea",
    idade: "3 anos",
    descricao: "Brincalhona",
    imagem: "https://placecats.com/120/160"
  },
  {
    nome: "Thor",
    tipo: "Cachorro",
    porte: "Grande",
    sexo: "Macho",
    idade: "3 anos",
    descricao: "Protetor e leal",
    imagem: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300"
  },
  {
    nome: "Bolinha",
    tipo: "Cachorro",
    porte: "Pequena",
    sexo: "Macho",
    idade: "2 anos",
    descricao: "Preguiçoso",
    imagem: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300"
  },
  {
    nome: "Max",
    tipo: "Cachorro",
    porte: "Grande",
    sexo: "Macho",
    idade: "4 anos",
    descricao: "Leal",
    imagem: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300"
  },
  {
    nome: "Mimi",
    tipo: "Gato",
    porte: "Pequena",
    sexo: "Fêmea",
    idade: "1 ano",
    descricao: "Companheira",
    imagem: "https://placecats.com/121/160"
  },
  {
    nome: "Rex",
    tipo: "Cachorro",
    porte: "Grande",
    sexo: "Macho",
    idade: "6 anos",
    descricao: "Protetor",
    imagem: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300"
  }
];

const lista = document.getElementById("listaAnimais");
const buscar = document.getElementById("buscar");
const botoesFiltro = document.querySelectorAll(".filtros button");

let filtroAtual = "todos";

function mostrarAnimais(listaDeAnimais) {
  lista.innerHTML = "";

  listaDeAnimais.forEach(animal => {
    lista.innerHTML += `
      <div class="card">
        <div class="conteudo">
          <img src="${animal.imagem}" alt="${animal.nome}">

          <div class="info">
            <h3>${animal.nome}</h3>
            <p>${animal.tipo}</p>
            <p>${animal.porte}</p>
            <p>${animal.sexo}</p>
            <p>${animal.idade}</p>
            <p>${animal.descricao}</p>
          </div>
        </div>

        <button type="button">Gerenciar</button>
      </div>
    `;
  });
}

function filtrarAnimais() {
  const texto = buscar.value.toLowerCase();

  const filtrados = animais.filter(animal => {
    const combinaPesquisa =
      animal.nome.toLowerCase().includes(texto) ||
      animal.tipo.toLowerCase().includes(texto) ||
      animal.porte.toLowerCase().includes(texto);

    const combinaFiltro =
      filtroAtual === "todos" ||
      animal.tipo.toLowerCase() === filtroAtual ||
      animal.porte.toLowerCase() === filtroAtual;

    return combinaPesquisa && combinaFiltro;
  });

  mostrarAnimais(filtrados);
}

buscar.addEventListener("input", filtrarAnimais);

botoesFiltro.forEach(botao => {
  botao.addEventListener("click", function() {
    filtroAtual = this.dataset.filtro;
    filtrarAnimais();
  });
});

mostrarAnimais(animais);