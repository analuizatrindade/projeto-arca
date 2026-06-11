const descricao = document.getElementById("descricao");
const contador = document.getElementById("contador");
const imagemAnimal = document.getElementById("imagemAnimal");
const uploadBox = document.getElementById("uploadBox");
const btnCadastrar = document.getElementById("btnCadastrar");

let imagemBase64 = "";

descricao.addEventListener("input", function () {
  contador.textContent = descricao.value.length;
});

imagemAnimal.addEventListener("change", function () {
  const arquivo = imagemAnimal.files[0];

  if (!arquivo) return;

  if (arquivo.size > 5 * 1024 * 1024) {
    alert("A imagem deve ter no máximo 5MB.");
    imagemAnimal.value = "";
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function (e) {
    imagemBase64 = e.target.result;

    uploadBox.innerHTML = `
      <img src="${imagemBase64}" class="preview-img" alt="Imagem do animal">
    `;
  };

  leitor.readAsDataURL(arquivo);
});

btnCadastrar.addEventListener("click", function () {
  const nome = document.getElementById("nome").value.trim();
  const tipo = document.getElementById("tipo").value;
  const porte = document.getElementById("porte").value;
  const sexo = document.getElementById("sexo").value;
  const idade = document.getElementById("idade").value.trim();
  const descricaoTexto = document.getElementById("descricao").value.trim();

  if (!nome || !tipo || !porte || !sexo || !idade || !descricaoTexto) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoAnimal = {
    id: Date.now(),
    nome: nome,
    tipo: tipo,
    porte: porte,
    sexo: sexo,
    idade: idade,
    descricao: descricaoTexto,
    status: "Para Adoção",
    cidade: "Serra",
    imagem: imagemBase64 || "https://placehold.co/300x200?text=Animal"
  };

  const animais = JSON.parse(localStorage.getItem("animais")) || [];

  animais.push(novoAnimal);

  localStorage.setItem("animais", JSON.stringify(animais));

  alert("Cadastro feito!");

  window.location.href = "../Catalogo Animais/catalogo.html";
});




function gerarImagemAleatoria(tipo) {
  const imagensCachorro = [
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600"
  ];

  const imagensGato = [
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
    "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600"
  ];

  const lista = tipo === "Gato" ? imagensGato : imagensCachorro;
  const indice = Math.floor(Math.random() * lista.length);

  return lista[indice];
}