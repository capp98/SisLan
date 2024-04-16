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
  const campoTelefone = event.target;
  let telefone = campoTelefone.value.replace(/\D+/g, ''); // Remove todos os caracteres que não são dígitos

  // Formatação de acordo com o comprimento do número de telefone
  if (telefone.length === 8) {
    telefone = telefone.replace(/(\d{4})(\d{4})/, '$1-$2'); // Formato: XXXX-XXXX
  } else if (telefone.length === 9) {
    telefone = telefone.replace(/(\d{5})(\d{4})/, '$1-$2'); // Formato: XXXXX-XXXX
  } else if (telefone.length === 10) {
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Formato: (XX) XXXX-XXXX
  }

  campoTelefone.value = telefone; // Atualiza o valor do campo de telefone
}

function formataData({ target }) {
  const campoData = target;
  let dataTexto = campoData.value.replace(/\D+/g, '');

  // Expressão regular para identificar o formato de data DDMMYYYY
  const reg = RegExp(/^([0-9]{2})([0-9]{2})([0-9]{4})$/g);

  // Verifica se a data possui o formato correto e formata
  const dataFormatada = reg.test(dataTexto)
    ? dataTexto.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
    : dataTexto;

  campoData.value = dataFormatada; // Atualiza o valor do campo de data
}

function formataRG(event) {
  let campoRG = event.target;
  let rg = campoRG.value.replace(/[^a-zA-Z0-9x\s]/g, '');

  campoRG.value =
    rg.length == 9
      ? rg
          .replace(/(\d{2})(\d{3})(\d{3})([0-9xX])/, '$1.$2.$3-$4')
          .toUpperCase()
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
  event.target.value = event.target.value.replace(/[^a-zA-Z0-9x\s]/g, '');
};

function formataTexto({ target }) {
  let nome = target.value.split(' ');
  let conjunto = [];

  nome.forEach((n) => {
    if (!n.match(/\b(?:da|de|do|das|dos)\b/g))
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
  cepCampo.value = cepCampo.value.replace(/(\d{5})(\d{3})/, '$1-$2');
}

// Array.from(document.getElementsByClassName('formataCEP')).map((campoCep) => {
//   campoCep.addEventListener('focusout', formataCEP);
// });

Array.from(document.getElementsByClassName('formataTexto')).map(
  (campoTexto) => {
    campoTexto.addEventListener('focusout', formataTexto);
  }
);

Array.from(document.getElementsByClassName('formataData')).map((campoData) => {
  campoData.addEventListener('focusout', formataData);
});

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
