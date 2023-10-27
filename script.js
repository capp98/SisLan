let servicos = await fetch('https://sislan-api.onrender.com/services/serviço')
  .then((response) => response.json())
  .then((data) => data);

let boletos = await fetch('https://sislan-api.onrender.com/services/boleto')
  .then((response) => response.json())
  .then((data) => data);

let documentos = await fetch(
  'https://sislan-api.onrender.com/services/documento'
)
  .then((response) => response.json())
  .then((data) => data);

document.getElementById('windowInfos').addEventListener('click', function (e) {
  if (e.target.id == 'windowInfos') e.target.style.display = 'none';
});

document.getElementById('search').addEventListener('keyup', function (e) {
  search(e.target.value);
});

let isDetailed = document.getElementById('details');

document.getElementById('search').addEventListener('click', function (e) {
  setTimeout(function () {
    let word = document.getElementById('search').value;
    search(word);
  }, 0);
});

function search(word) {
  let as = document.querySelectorAll('a');
  as.forEach((a) => {
    if (a) {
      a.dataset.service.toLowerCase().includes(word.toLowerCase())
        ? (a.style.display = 'block')
        : (a.style.display = 'none');
    }
  });
}

adicionaBoletos();

adicionaDocumentos();

adicionaServicos();

function ordenaPorNome(a, b) {
  const nomeA = a.nome.toUpperCase();
  const nomeB = b.nome.toUpperCase();

  if (nomeA < nomeB) return -1;
  if (nomeA > nomeB) return 1;
  return 0;
}

function adicionaBoletos() {
  let div = document.createElement('div');
  let servicosDiv = document.getElementById('boletos');
  div.className = 'links';

  let link = null;

  boletos.forEach((boleto) => {
    link = document.createElement('a');

    link.target = '_blank';
    link.href = boleto.url;
    link.dataset.service = boleto.nome;
    link.dataset.type = boleto.servico;
    link.innerHTML = boleto.nome;
    link.addEventListener('click', showInfos);

    div.appendChild(link);
  });
  servicosDiv.appendChild(div);
}

function adicionaServicos() {
  let div = document.createElement('div');
  let servicosDiv = document.getElementById('servicos');
  div.className = 'links';

  let link = null;
  servicos.forEach((servico) => {
    link = document.createElement('a');

    link.target = '_blank';
    link.href = servico.url;
    link.dataset.service = servico.nome;
    link.innerHTML = servico.nome;
    link.dataset.type = servico.servico;

    link.addEventListener('click', showInfos);
    div.appendChild(link);
  });
  servicosDiv.appendChild(div);
}

function adicionaDocumentos() {
  let div = document.createElement('div');
  let servicosDiv = document.getElementById('documentos');
  div.className = 'links';

  let link = null;
  documentos.forEach((boleto) => {
    link = document.createElement('a');

    link.target = '_blank';
    link.href = boleto.url;
    link.dataset.service = boleto.nome;
    link.dataset.type = boleto.servico;
    link.innerHTML = boleto.nome;
    link.addEventListener('click', showInfos);

    div.appendChild(link);
  });
  servicosDiv.appendChild(div);
}

function showInfos(e) {
  let a = e.target;
  if (isDetailed.checked) {
    e.preventDefault();
    let infosWindows = document.getElementById('infos');

    if (infosWindows.childNodes.length >= 1) {
      let chs = Array.from(infosWindows.children);
      chs.forEach((child) => infosWindows.removeChild(child));
    }

    let t2 = document.createElement('h2');
    t2.innerHTML = a.dataset.service;
    infosWindows.appendChild(t2);

    let tipo = a.dataset.type;

    let infoFound = null;

    if (tipo == 'documento') {
      infoFound = documentos.find(
        (servico) => servico.nome === a.dataset.service
      );
    } else if (tipo == 'boleto') {
      infoFound = boletos.find((servico) => servico.nome === a.dataset.service);
    } else {
      infoFound = servicos.find(
        (servico) => servico.nome === a.dataset.service
      );
    }

    if (!!infoFound.extras) {
      let li = null;
      let t3 = null;

      if (!!infoFound.extras.preco) {
        let precosDiv = document.createElement('ul');
        t3 = document.createElement('h3');
        t3.innerHTML = 'Preço';
        precosDiv.appendChild(t3);

        if (infoFound.extras.preco.includes(';')) {
          infoFound.extras.preco.split(';').forEach((preco) => {
            li = document.createElement('li');
            li.innerHTML = preco;
            precosDiv.appendChild(li);
          });
        } else {
          li = document.createElement('li');
          li.innerHTML = infoFound.extras.preco;
          precosDiv.appendChild(li);
        }

        infosWindows.appendChild(precosDiv);
      }

      if (!!infoFound.extras.necessario) {
        let necessariosDiv = document.createElement('ul');
        t3 = document.createElement('h3');
        t3.innerHTML = 'Necessário';
        necessariosDiv.appendChild(t3);

        if (infoFound.extras.necessario.includes(';')) {
          infoFound.extras.necessario.split(';').forEach((necessario) => {
            li = document.createElement('li');
            li.innerHTML = necessario;
            necessariosDiv.appendChild(li);
          });
        } else {
          li = document.createElement('li');
          li.innerHTML = infoFound.extras.necessario;
          necessariosDiv.appendChild(li);
        }

        infosWindows.appendChild(necessariosDiv);
      }

      if (!!infoFound.extras.entrega) {
        let entregasDiv = document.createElement('ul');
        t3 = document.createElement('h3');
        t3.innerHTML = 'Entrega';
        entregasDiv.appendChild(t3);

        if (infoFound.extras.entrega.includes(';')) {
          infoFound.extras.entrega.split(';').forEach((entrega) => {
            li = document.createElement('li');
            li.innerHTML = entrega;
            entregasDiv.appendChild(li);
          });
        } else {
          li = document.createElement('li');
          li.innerHTML = infoFound.extras.entrega;
          entregasDiv.appendChild(li);
        }

        infosWindows.appendChild(entregasDiv);
      }

      if (!!infoFound.extras.instrucoes) {
        let instrucoesDiv = document.createElement('ul');
        t3 = document.createElement('h3');
        t3.innerHTML = 'Instruções';
        instrucoesDiv.appendChild(t3);

        if (infoFound.extras.instrucoes.includes(';')) {
          infoFound.extras.instrucoes.split(';').forEach((instrucoes) => {
            li = document.createElement('li');
            li.innerHTML = instrucoes;
            instrucoesDiv.appendChild(li);
          });
        } else {
          li = document.createElement('li');
          li.innerHTML = infoFound.extras.instrucoes;
          instrucoesDiv.appendChild(li);
        }

        infosWindows.appendChild(instrucoesDiv);
      }
    }

    let link = document.createElement('a');
    link.target = '_blank';
    link.innerHTML = 'Ir';
    link.href = a.href;
    infosWindows.appendChild(link);

    document.getElementById('windowInfos').style.display = 'block';

    document.body.addEventListener('keydown', keyDownListener);
    document.body.removeEventListener('keydown', keyDownListenerClearSearch);
  }
}

let keyDownListener = function (e) {
  if (e.which === 27) {
    document.getElementById('windowInfos').style.display = 'none';

    document.body.removeEventListener('keydown', keyDownListener);
    document.body.addEventListener('keydown', keyDownListenerClearSearch);
  }
};

let keyDownListenerClearSearch = function (e) {
  if (e.which === 27) {
    document.getElementById('search').value = '';
    document.querySelectorAll('a').forEach((a) => (a.style.display = 'block'));
  }
};

document.body.addEventListener(
  'load',
  document.body.addEventListener('keydown', keyDownListenerClearSearch),
  false
);
