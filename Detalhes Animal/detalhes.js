const parametros = new URLSearchParams(window.location.search);
const id = Number(parametros.get("id"));

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
    imagem: "https://placehold.co/300x200?text=Dog"
  },
  {
    id: 2,
    nome: "Mimi",
    tipo: "Gato",
    porte: "Pequeno",
    idade: "1 ano",
    descricao: "Amorosa e independente.",
    status: "Para Adoção",
    cidade: "Serra",
    sexo: "Fêmea",
    imagem: "https://placehold.co/300x200?text=Cat"
  },
  {
    id: 3,
    nome: "Nina",
    tipo: "Gato",
    porte: "Pequeno",
    idade: "2 anos",
    descricao: "Nina é uma gatinha dócil e carinhosa, resgatada em 2025 no bairro Laranjeiras. Está vacinada, castrada e pronta para um lar amoroso.",
    status: "Para Adoção",
    cidade: "Serra",
    sexo: "Fêmea",
    imagem: "https://placehold.co/300x200?text=Nina"
  }
];

const animaisSalvos = JSON.parse(localStorage.getItem("animais")) || [];
const animais = [...animaisPadrao, ...animaisSalvos];

const animal = animais.find(item => Number(item.id) === id);

if (!animal) {
  alert("Animal não encontrado!");
  window.location.href = "../Catalogo Animais/catalogo.html";
} else {
  document.getElementById("imagemAnimal").src = animal.imagem;
  document.getElementById("mini1").src = animal.imagem;
  document.getElementById("mini2").src = animal.imagem;
  document.getElementById("mini3").src = animal.imagem;

  document.getElementById("statusAnimal").textContent = animal.status || "Para Adoção";
  document.getElementById("nomeAnimal").textContent = animal.nome;
  document.getElementById("sexoAnimal").textContent = animal.sexo || "Não informado";
  document.getElementById("cidadeAnimal").textContent = animal.cidade || "Serra";
  document.getElementById("descricaoAnimal").textContent = animal.descricao || "Sem descrição.";
}

function voltar() {
  window.location.href = "../Catalogo Animais/catalogo.html";
}