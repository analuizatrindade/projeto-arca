function caminhoAtual() {
  return decodeURIComponent(window.location.pathname);
}

function usuarioLogado() {
  return JSON.parse(localStorage.getItem("usuarioLogado") || "null");
}

function paginaOng() {
  const caminho = caminhoAtual();
  return caminho.includes("/Principal ONG/") || caminho.includes("/Animais.ong/") || caminho.includes("/Denuncia ONG/") || caminho.includes("/Cadastrar Animal/") || caminho.includes("/ONG/");
}

function paginaTutor() {
  const caminho = caminhoAtual();
  return caminho.includes("/Pagina Tutor/") || caminho.includes("/Catalogo Animais/") || caminho.includes("/Denuncia/") || caminho.includes("/Detalhes Animal/") || caminho.includes("/Perfil Tutor/");
}

function paginaCompartilhada() {
  const caminho = caminhoAtual();
  return caminho.includes("/voluntario tutor/") || caminho.includes("/Cadastro Voluntario/");
}

function tipoUsuarioAtual() {
  const dados = usuarioLogado();

  if (dados && dados.tipo) {
    localStorage.setItem("tipoUsuarioAtual", dados.tipo);
    return dados.tipo;
  }

  if (paginaOng()) {
    return "ong";
  }

  if (paginaTutor() || paginaCompartilhada()) {
    return "tutor";
  }

  return localStorage.getItem("tipoUsuarioAtual") || "tutor";
}

function protegerPagina() {
  const dados = usuarioLogado();
  if (!dados || !dados.tipo) return;

  if (dados.tipo === "tutor" && paginaOng()) {
    if (caminhoAtual().includes("/ONG/")) {
      window.location.href = "../Perfil Tutor/perfil.html";
      return;
    }

    window.location.href = "../Pagina Tutor/tutor.html";
    return;
  }

  if (dados.tipo === "ong" && paginaTutor()) {
    if (caminhoAtual().includes("/Perfil Tutor/")) {
      window.location.href = "../ONG/ong.html";
      return;
    }

    window.location.href = "../Principal ONG/ong.html";
  }
}

function aplicarMenuPorTipo() {
  protegerPagina();

  const nav = document.querySelector("header nav");
  if (!nav) return;

  const tipo = tipoUsuarioAtual();

  if (tipo === "ong") {
    nav.innerHTML = `
      <a href="../Principal ONG/ong.html">Início</a>
      <a href="../Animais.ong/pesquisa.html">Animais</a>
      <a href="../Denuncia ONG/denunciaRecebida.html">Denúncias</a>
      <a href="../voluntario tutor/voluntario.html">Voluntários</a>
      <a href="../ONG/ong.html">Perfil</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="../Pagina Tutor/tutor.html">Início</a>
      <a href="../Catalogo Animais/catalogo.html">Animais</a>
      <a href="../Denuncia/denuncia.html">Denunciar</a>
      <a href="../voluntario tutor/voluntario.html">Voluntários</a>
      <a href="../Perfil Tutor/perfil.html">Perfil</a>
    `;
  }
}

function sairDaConta() {
  localStorage.removeItem("usuarioLogado");
  localStorage.removeItem("tipoUsuarioAtual");
  window.location.href = "../Login/login.html";
}

aplicarMenuPorTipo();
