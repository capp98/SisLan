let cursoIndex = 1;
let trabalhoIndex = 1;

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

const resetaCampo = (event) => {
  event.target.value = event.target.value.replace(/\D+/g, '');
};

//#region SELETORES E EVENTOS

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

const cep = document.getElementById('cep');
cep.addEventListener('focusout', formataCEP);
cep.addEventListener('focus', resetaCampo);
cep.addEventListener('keyup', handleCEP);

const cepDois = document.getElementById('cep2');
cepDois.addEventListener('focusout', formataCEP);
cepDois.addEventListener('focus', resetaCampo);
cepDois.addEventListener('keyup', handleCEPDois);

const cepTres = document.getElementById('cep3');
cepTres.addEventListener('focusout', formataCEP);
cepTres.addEventListener('focus', resetaCampo);
cepTres.addEventListener('keyup', handleCEPTres);

const name = document.getElementById('name');
name.addEventListener('focusout', formataNome);
const name2 = document.getElementById('name2');
name2.addEventListener('focusout', formataNome);

const endereco = document.getElementById('endereco');
endereco.addEventListener('keydown', handleEndereco);

const enderecoDois = document.getElementById('endereco2');
endereco.addEventListener('keydown', handleEndereco);

const enderecoTres = document.getElementById('endereco3');
endereco.addEventListener('keydown', handleEndereco);

Array.from(document.getElementsByClassName('rg')).map((el) => {
  el.addEventListener('focus', resetaCampo);
  el.addEventListener('focusout', formataRG);
});

Array.from(document.getElementsByClassName('cpf')).map((el) => {
  el.addEventListener('focus', resetaCampo);
  el.addEventListener('focusout', formataCPF);
});

//#endregion

//HANDLERS

function handleEndereco(event) {
  if (event.which == 9 || event.keyCode == 9) {
    let bairro = document.getElementById('bairro');

    fetch(`https://viacep.com.br/ws/SP/Guaruja/${endereco.value}/json/`)
      .then((res) => res.json())
      .then((json) => {
        endereco.value = json[0].logradouro;
        bairro.value = json[0].bairro;
        cep.value = json[0].cep;
      });
  }
}

function formataCEP({ target }) {
  target.value = target.value.replace(/(\d{5})(\d{3})/, '$1-$2');
}

function formataNome({ target }) {
  let nome = target.value.split(' ');
  let conjunto = [];

  nome.forEach((n) => {
    if (!n.match(/\bd[a,o,e][s]?\b/g))
      conjunto.push(n.charAt(0).toUpperCase() + n.slice(1));
    else conjunto.push(n);
  });
  target.value = conjunto.join(' ');
}

async function handleCEP(event) {
  let cepCampo = event.target;
  if (cepCampo.value.length == 8) {
    let bairro = document.getElementById('bairro');

    fetch(`https://viacep.com.br/ws/${cepCampo.value}/json/`)
      .then((res) => res.json())
      .then((json) => {
        endereco.value = json.logradouro;
        bairro.value = json.bairro;
      });
  }
}

async function handleCEPDois(event) {
  let cepCampo = event.target;
  if (cepCampo.value.length == 8) {
    let bairro = document.getElementById('bairro2');

    fetch(`https://viacep.com.br/ws/${cepCampo.value}/json/`)
      .then((res) => res.json())
      .then((json) => {
        enderecoDois.value = json.logradouro;
        bairro.value = json.bairro;
      });
  }
}

async function handleCEPTres(event) {
  let cepCampo = event.target;
  if (cepCampo.value.length == 8) {
    let bairro = document.getElementById('bairro3');

    fetch(`https://viacep.com.br/ws/${cepCampo.value}/json/`)
      .then((res) => res.json())
      .then((json) => {
        enderecoTres.value = json.logradouro;
        bairro.value = json.bairro;
      });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  gen(formJSON);
}

//#region MANIPULA CAMPOS

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

//#endregion

function gen(dados) {
  const texto = docx.TextRun;
  const paragrafo = docx.Paragraph;

  const paragrafoTitulo = (titulo) =>
    new paragrafo({
      children: [
        new texto({
          text: titulo.toUpperCase(),
          bold: true,
        }),
      ],
      style: 'titulo',
      spacing: {},
      alignment: docx.AlignmentType.CENTER,
    });

  const paragrafoPartes = (
    titulo,
    nome,
    genero,
    rg,
    cpf,
    endereco,
    numero,
    bairro,
    cep
  ) =>
    new paragrafo({
      children: [
        new texto({
          text: `${titulo}${genero == 'o' ? '' : 'a'}: ${nome}`,
          bold: true,
        }),
        new texto(
          `, brasileir${genero}, ${genero == 'o' ? 'portador' : 'portadora'} do`
        ),
        new texto({ text: ` RG nº ${rg}`, bold: true }),
        new texto(` e inscrit${genero} no CPF de`),
        new texto({ text: ` nº ${cpf}`, bold: true }),
        new texto(`, residente e domiciliad${genero} a `),
        new texto({
          text: `${endereco}, nº ${numero}, ${bairro} – Guarujá/SP, CEP: ${cep}.`,
          bold: true,
        }),
      ],
      indent: {
        firstLine: '1.25cm',
      },
      style: 'normal',
      alignment: docx.AlignmentType.JUSTIFIED,
      spacing: {
        line: 276, //240 * xcm
      },
    });

  const espacoVazio = new paragrafo({ text: '' });

  const paragrafoDepois = new paragrafo({
    children: [
      new texto({
        text: `Firmam entre si o presente contrato de venda e posse, pel${dados.genero} `,
      }),
      new texto({
        text: `VENDEDOR${dados.genero == 'a' ? 'A' : ''} `,
        bold: true,
      }),
      new texto({
        text: `e ${dados.genero2} `,
      }),
      new texto({
        text: `COMPRADOR${dados.genero2 == 'a' ? 'A' : ''}, `,
        bold: true,
      }),
      new texto({
        text: 'referente a ',
      }),
      new texto({
        text: `${dados.descricao}, situada a ${dados.endereco3}, nº ${dados.numero3}, ${dados.bairro3}, Cidade de Guarujá, Estado de São Paulo.`,
        bold: true,
      }),
    ],
    style: 'normal',
    alignment: docx.AlignmentType.JUSTIFIED,
    indent: {
      firstLine: '1.25cm',
    },
    spacing: {
      line: 276,
    },
  });

  const data = new Date();

  const paragrafoAntesLinha = new paragrafo({
    children: [
      new texto({
        text: `Guarujá, ${data.getDate()} de ${
          meses[data.getMonth()]
        } de ${data.getFullYear()}.`,
      }),
    ],
    alignment: docx.AlignmentType.CENTER,
    style: 'normal',
    spacing: {
      line: 189 * 2,
    },
  });

  const paragrafoLinha = new paragrafo({
    children: [
      new texto({
        text: '_____________________________________________',
      }),
    ],
    style: 'normal',
    spacing: {
      line: 276,
    },
  });

  const doc = new docx.Document({
    creator: 'Batata - Lan house e Informática',
    title: 'Contrato de Compra e Venda de Bem Imóvel ' + dados.nome,

    description: 'Contrato de Compra e Venda de Bem Imóvel',
    styles: {
      paragraphStyles: [
        {
          id: 'normal',
          name: 'normal',
          quickFormat: true,
          run: {
            font: 'Verdana',
            size: 12 * 2,
          },
        },
        {
          id: 'titulo',
          name: 'titulo',
          quickFormat: true,
          run: {
            font: 'Verdana',
            size: 14 * 2,
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: '1.27cm',
              right: '1.27cm',
              bottom: '0cm',
              left: '1.27cm',
            },
          },
        },
        children: [
          paragrafoTitulo('Contrato de compra e venda de bem imóvel'),
          espacoVazio,
          new paragrafo({ text: 'As partes abaixo qualificadas:' }),
          espacoVazio,
          espacoVazio,
          paragrafoPartes(
            'Vendedor',
            dados.nome,
            dados.genero,
            dados.rg,
            dados.cpf,
            dados.endereco,
            dados.numero,
            dados.bairro,
            dados.cep
          ),
          espacoVazio,
          espacoVazio,
          paragrafoPartes(
            'Comprador',
            dados.nome2,
            dados.genero2,
            dados.rg2,
            dados.cpf2,
            dados.endereco2,
            dados.numero2,
            dados.bairro2,
            dados.cep2
          ),
          espacoVazio,
          espacoVazio,
          paragrafoDepois,
          espacoVazio,
          espacoVazio,
          new paragrafo({
            children: [
              new texto({
                text: `No valor de R$ ${dados.valor} (${dados.valor
                  .split(',')[0]
                  .extenso()} reais)`,
                bold: true,
              }),
            ],
            indent: {
              firstLine: '1.25cm',
            },
          }),
          espacoVazio,
          espacoVazio,
          new paragrafo({
            children: [
              new texto({
                text: 'Forma de Pagamento',
                bold: true,
              }),
            ],
            indent: {
              firstLine: '1.25cm',
            },
            spacing: {
              line: 360,
              after: convertePt(10),
            },
          }),
          new paragrafo({
            children: [
              new texto({
                text: `${dados.genero2.toUpperCase()} Comprador${
                  dados.genero2 == 'a' ? 'a' : ''
                } pagou a${dados.genero == 'o' ? 'o' : ''} Vendedor${
                  dados.genero == 'a' ? 'a' : ''
                } o valor de R$ ${dados.valor} (${dados.valor
                  .split(',')[0]
                  .extenso()} reais). ${dados.formaDePagamento}`,
              }),
            ],
            indent: {
              firstLine: '1.25cm',
            },
          }),
          espacoVazio,
          espacoVazio,
          paragrafoLinha,
          new paragrafo({
            children: [new texto({ text: dados.nome, bold: true })],
            spacing: {
              line: 276,
            },
          }),
          new paragrafo({
            text: `(Assinatura d${dados.genero} Vendedor${
              dados.genero == 'a' ? 'a' : ''
            })`,
          }),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          paragrafoLinha,
          new paragrafo({
            children: [new texto({ text: dados.nome2, bold: true })],
            spacing: {
              line: 276,
            },
          }),
          new paragrafo({
            text: `(Assinatura d${dados.genero2} Comprador${
              dados.genero2 == 'a' ? 'a' : ''
            })`,
          }),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          paragrafoAntesLinha,
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Contrato de Compra e Venda de Bem Imóvel ${dados.nome}.docx`);
    console.log('Document created successfully');
  });
}

//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]
String.prototype.extenso = function (c) {
  var ex = [
    [
      'zero',
      'um',
      'dois',
      'três',
      'quatro',
      'cinco',
      'seis',
      'sete',
      'oito',
      'nove',
      'dez',
      'onze',
      'doze',
      'treze',
      'quatorze',
      'quinze',
      'dezesseis',
      'dezessete',
      'dezoito',
      'dezenove',
    ],
    [
      'dez',
      'vinte',
      'trinta',
      'quarenta',
      'cinqüenta',
      'sessenta',
      'setenta',
      'oitenta',
      'noventa',
    ],
    [
      'cem',
      'cento',
      'duzentos',
      'trezentos',
      'quatrocentos',
      'quinhentos',
      'seiscentos',
      'setecentos',
      'oitocentos',
      'novecentos',
    ],
    [
      'mil',
      'milhão',
      'bilhão',
      'trilhão',
      'quadrilhão',
      'quintilhão',
      'sextilhão',
      'setilhão',
      'octilhão',
      'nonilhão',
      'decilhão',
      'undecilhão',
      'dodecilhão',
      'tredecilhão',
      'quatrodecilhão',
      'quindecilhão',
      'sedecilhão',
      'septendecilhão',
      'octencilhão',
      'nonencilhão',
    ],
  ];
  var a,
    n,
    v,
    i,
    n = this.replace(c ? /[^,\d]/g : /\D/g, '').split(','),
    e = ' e ',
    $ = 'real',
    d = 'centavo',
    sl;
  for (
    var f = n.length - 1, l, j = -1, r = [], s = [], t = '';
    ++j <= f;
    s = []
  ) {
    j && (n[j] = (('.' + n[j]) * 1).toFixed(2).slice(2));
    if (
      !((a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g)),
      (v = l % 3 ? [v.slice(0, l % 3)] : []),
      (v = a ? v.concat(a) : v)).length
    )
      continue;
    for (a = -1, l = v.length; ++a < l; t = '') {
      if (!(i = v[a] * 1)) continue;
      (i % 100 < 20 && (t += ex[0][i % 100])) ||
        ((i % 100) + 1 &&
          (t +=
            ex[1][(((i % 100) / 10) >> 0) - 1] +
            (i % 10 ? e + ex[0][i % 10] : '')));
      s.push(
        (i < 100
          ? t
          : !(i % 100)
          ? ex[2][i == 100 ? 0 : (i / 100) >> 0]
          : ex[2][(i / 100) >> 0] + e + t) +
          ((t = l - a - 2) > -1
            ? ' ' + (i > 1 && t > 0 ? ex[3][t].replace('ão', 'ões') : ex[3][t])
            : '')
      );
    }
    a =
      (sl = s.length) > 1
        ? ((a = s.pop()), s.join(' ') + e + a)
        : s.join('') || ((!j && n[j + 1] * 1 > 0) || r.length ? '' : ex[0][0]);
    a &&
      r.push(
        a +
          (c
            ? ' ' +
              (v.join('') * 1 > 1
                ? j
                  ? d + 's'
                  : (/0{6,}$/.test(n[0]) ? 'de ' : '') + $.replace('l', 'is')
                : j
                ? d
                : $)
            : '')
      );
  }
  return r.join(e);
};
