let meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const convertePt = (valor) => valor * 20;

//#region Formata Campos

function formataTelefone(event) {
  let telefoneCampo = event.target;
  let telefone = telefoneCampo.value.replace(/\D+/g, '');

  telefone =
    telefone.length < 9
      ? telefone.replace(/(\d{4})(\d{4})/, '$1-$2')
      : telefone.length == 9
      ? telefone.replace(/(\d{5})(\d{4})/, '$1-$2')
      : telefone.replace(/(\d{2})(\d{5})(\d{2})/, '($1) $2-$3');

  telefoneCampo.value = telefone;
}

function formataData({ target }) {
  let periodo = target.value;

  let reg = RegExp(/^([0-9]{2})([0-9]{2})([0-9]{4})$/g);

  let a = periodo
    .split(' ')
    .map((i) =>
      reg.test(i) ? i.replace(/([0-9]{2})([0-9]{2})([0-9]{4})/, '$1/$2/$3') : i
    )
    .join(' ');

  target.value = a;
}

function formataRG(event) {
  let campoRG = event.target;
  let rg = campoRG.value.replace(/\D+/g, '');

  campoRG.value =
    rg.length == 9
      ? rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
      : rg;
}

function formataCPF(event) {
  let campoCPF = event.target;
  let cpf = campoCPF.value.replace(/\D+/g, '');

  campoCPF.value =
    cpf.length == 11
      ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
      : cpf;
}

const resetaCampo = (event) => {
  event.target.value = event.target.value.replace(/\D+/g, '');
};

function formataTexto({ target }) {
  let nome = target.value.split(' ');
  let conjunto = [];

  nome.forEach((n) => {
    if (!n.match(/\bd[a,o,e][s]?\b/g))
      conjunto.push(n.charAt(0).toUpperCase() + n.slice(1));
    else conjunto.push(n);
  });
  target.value = conjunto.join(' ');
}

// function formataCEP({ target }) {
//   target.value = target.value.replace(/(\d{5})(\d{3})/, '$1-$2');
// }

//#endregion

//#region Handlers

async function handleCEP(cepCampo, enderecoCampo, bairroCampo) {
  if (cepCampo.value.length == 8) {
    fetch(`https://viacep.com.br/ws/${cepCampo.value}/json/`)
      .then((res) => res.json())
      .then((json) => {
        enderecoCampo.value = json.logradouro;
        bairroCampo.value = json.bairro;
      });
    cepCampo.value = cepCampo.value.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}

function handleEndereco(cepCampo, enderecoCampo, bairroCampo) {
  fetch(`https://viacep.com.br/ws/SP/Guaruja/${enderecoCampo.value}/json/`)
    .then((res) => res.json())
    .then((json) => {
      enderecoCampo.value = json[0].logradouro;
      bairroCampo.value = json[0].bairro;
      cepCampo.value = json[0].cep;
    });
}

// Array.from(document.getElementsByClassName('formataCEP')).map((campoCep) => {
//   campoCep.addEventListener('focusout', formataCEP);
// });

Array.from(document.getElementsByClassName('formataTexto')).map(
  (campoTexto) => {
    campoTexto.addEventListener('focusout', formataTexto);
  }
);

Array.from(document.getElementsByClassName('formataRG')).map((el) => {
  el.addEventListener('focus', resetaCampo);
  el.addEventListener('focusout', formataRG);
});

Array.from(document.getElementsByClassName('formataCPF')).map((el) => {
  el.addEventListener('focus', resetaCampo);
  el.addEventListener('focusout', formataCPF);
});

//#endregion

export {
  meses,
  convertePt,
  formataTelefone,
  formataData,
  formataCPF,
  formataRG,
  formataTexto,
  resetaCampo,
  handleCEP,
  handleEndereco,
};
