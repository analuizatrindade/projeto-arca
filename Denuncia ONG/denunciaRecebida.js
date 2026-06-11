const lista = document.getElementById("listaDenuncias");
const btnTodas = document.querySelector(".btn-todas");

function buscarDenuncias() {
  return JSON.parse(localStorage.getItem("denuncias")) || [];
}

function mostrarDenuncias(denuncias) {

  lista.innerHTML = "";

  if (denuncias.length === 0) {
    lista.innerHTML =
      "<p>Nenhuma denúncia encontrada.</p>";
    return;
  }

  denuncias.forEach(function(denuncia) {

    lista.innerHTML += `
      <div class="denuncia">

        <div class="local">
          <div class="icone-local">⌖</div>

          <div>
            <p>
              <strong>${denuncia.tipo}</strong>
              - ${denuncia.endereco}
            </p>

            <p>${denuncia.descricao}</p>

            <p>
              <strong>Data:</strong>
              ${denuncia.data}
            </p>
          </div>
        </div>

        <div class="distancia">
          Próximo
        </div>

        <div class="status">

          <h3>Status</h3>

          <select
            onchange="alterarStatus(${denuncia.id}, this.value)"
          >

            <option value="Pendente"
            ${denuncia.status === "Pendente" ? "selected" : ""}>
              Pendente
            </option>

            <option value="Em análise"
            ${denuncia.status === "Em análise" ? "selected" : ""}>
              Em análise
            </option>

            <option value="Equipe enviada"
            ${denuncia.status === "Equipe enviada" ? "selected" : ""}>
              Equipe enviada
            </option>

            <option value="Resolvido"
            ${denuncia.status === "Resolvido" ? "selected" : ""}>
              Resolvido
            </option>

          </select>

          <br><br>

          <button
            onclick="excluirDenuncia(${denuncia.id})"
            class="btn-excluir"
          >
            Excluir
          </button>

        </div>

      </div>
    `;
  });
}

function alterarStatus(id, novoStatus) {

  let denuncias = buscarDenuncias();

  denuncias.forEach(function(denuncia) {

    if (denuncia.id == id) {
      denuncia.status = novoStatus;
    }

  });

  localStorage.setItem(
    "denuncias",
    JSON.stringify(denuncias)
  );

  mostrarDenuncias(denuncias);
}

function excluirDenuncia(id) {

  if (!confirm("Excluir denúncia?")) {
    return;
  }

  let denuncias = buscarDenuncias();

  denuncias = denuncias.filter(function(denuncia) {
    return denuncia.id != id;
  });

  localStorage.setItem(
    "denuncias",
    JSON.stringify(denuncias)
  );

  mostrarDenuncias(denuncias);
}

btnTodas.addEventListener("click", function() {
  mostrarDenuncias(buscarDenuncias());
});

mostrarDenuncias(buscarDenuncias());