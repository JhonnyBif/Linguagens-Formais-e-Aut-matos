//Jhonny Mezzari Bif

// Padrão S = XX|XX; A = ZZ|ZZ; B = CC|C;
// "S=1B|2A;A=1A|1;B=2B|2"
let padrao;
let producao;
let S;
let A;
let B;
let C;
let resolucao;
let index;
document.getElementById('submitButton').addEventListener('click', async function() {
  padrao = document.getElementById('inputField').value;
  producao = padrao.split(";");
  console.log("producao", producao)
  S = producao[0].split("=")[1].split("|");
  A = producao[1].split("=")[1].split("|");
  B = producao[2] ?? producao[2].split("=")[1].split("|");
  C = producao[3] ?? producao[3].split("=")[1].split("|");
  resolucao = "";
  index = 0
  limparElementosHTML();
  await comeco();
  adicionarElementosHTML();
});
;

async function segundaParteLetra() {
  console.log(resolucao)
  for (let i = 0; i < resolucao.length; i++) {
    if (resolucao[i] === resolucao[i].toUpperCase()) {
      for (const x of producao) {
        let prod = x.split("=");
        if (resolucao[i] === prod[0]) {
          console.log(prod)
          let resultadoRecursivo = await recursivo(prod);
          if(resultadoRecursivo !== 'e'){
            resolucao = resolucao.slice(0, i) + resultadoRecursivo + resolucao.slice(i + 1);
          } else {
            resolucao = resolucao.slice(0, i) + resolucao.slice(i + 1);

          }
            await segundaParteLetra();
          
        }
      }
    }
  }
  return;
}

async function segundaParteNumero() {
  console.log(resolucao,)
  for (let i = 0; i < resolucao.length; i++) {
    if (resolucao[i] === resolucao[i].toUpperCase()) {
      for (const x of producao) {
        let prod = x.split("=");
        if (resolucao[i] === prod[0]) {
          let resultadoRecursivo = await recursivo(prod);
          resolucao = resolucao.slice(0, i) + resultadoRecursivo + resolucao.slice(i + 1);
          if (resolucao[i].toUpperCase() === resolucao[i]) {
            await segundaParteNumero();
          } else {
            return;
          }
        }
      }
    }
  }
  return;
}

async function recursivo(prod) {
  let radomNumber = Math.random() * 10;
  if (radomNumber <= 5) {
    console.log('primiera', prod[1].split("|")[0] ? prod[1].split("|")[0] : prod[1])
    return prod[1].split("|")[0] ? prod[1].split("|")[0] : prod[1];
  } else {
    console.log('primiera', prod[1].split("|")[1] ? prod[1].split("|")[1] : prod[1])
    return prod[1].split("|")[1]? prod[1].split("|")[1] : prod[1];
  }
}

async function comeco() {
  let radomNumber = Math.random() * 10;
  if (radomNumber <= 5) {
    resolucao = S[0];
    if (!isNaN(parseFloat(S[0][0])) && isFinite(S[0][0])){
      await segundaParteNumero();
      console.log(resolucao, "resolucao");
      return;
    } else {
      await segundaParteLetra();
      console.log(resolucao, "resolucao");
      return;
    }
  } else {
    resolucao = S[1];
    if (!isNaN(parseFloat(S[0][0])) && isFinite(S[0][0])){
      await segundaParteNumero();
      console.log(resolucao, "resolucao");
      return;
    } else {
      await segundaParteLetra();
      console.log(resolucao, "resolucao");
      return;
    }
  }
}
function adicionarElementosHTML() {
  let logContainer = document.createElement('div');
  logContainer.id = 'logContainer';
  logContainer.innerHTML = `<p>Entrada = S=${S} <br> A=${A}<br> ${B} <br> ${C} </p>
  <span>Escolhas:</span>`;

  for (let i = 0; i < resolucao.length; i++) {
    let divElement = document.createElement('div');
    divElement.textContent = resolucao.slice(0, i + 1);
    logContainer.appendChild(divElement);
  }
  let button = document.getElementById('submitButton');
  button.parentNode.insertBefore(logContainer, button.nextSibling);
}

function limparElementosHTML() {
  let logContainer = document.getElementById('logContainer');
  if (logContainer) {
    logContainer.parentNode.removeChild(logContainer);
  }
}

