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

document.getElementById('name').addEventListener('focusout', formataNome);
document.getElementById('name2').addEventListener('focusout', formataNome);
document
  .getElementById('declaradoCargo')
  .addEventListener('focusout', formataNome);
document.getElementById('diaInicio').addEventListener('focusout', formataNome);
document.getElementById('diaTermino').addEventListener('focusout', formataNome);

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

  const declaracao = new docx.Paragraph({
    children: [
      new texto('Eu, '),
      new texto({ text: `${dados.declaranteNome}`, bold: true }),
      new texto(`, portador${dados.declaranteGenero == 'o' ? '' : 'a'} do`),
      new texto({ text: ` RG nº ${dados.declaranteRg}`, bold: true }),
      new texto(` e inscrit${dados.declaranteGenero} no `),
      new texto({
        text: `CPF sob o nº ${dados.declaranteCpf}`,
        bold: true,
      }),
      new texto(', declaro para os devidos fins que '),
      new texto({ text: `${dados.declaradoNome}`, bold: true }),
      new texto(`, portador${dados.declaradoGenero == 'o' ? '' : 'a'} do `),
      new texto({
        text: `RG nº ${dados.declaradoRg}`,
        bold: true,
      }),
      new texto(`, inscrit${dados.declaradoGenero} no `),
      new texto({
        text: `CPF nº ${dados.declaradoCpf}`,
        bold: true,
      }),
      new texto(', trabalha em minha empresa como '),
      new texto({
        text: `${dados.declaradoCargo}`,
        bold: true,
      }),
      new texto(' no período de '),
      new texto({
        text: `${dados.diaInicio} a ${dados.diaTermino} das ${dados.horaInicio} às ${dados.horaTermino} hs.`,
        bold: true,
      }),
    ],
    indent: {
      firstLine: '1.25cm',
    },
  });

  const espacoVazio = new paragrafo({ text: '' });

  const data = new Date();

  const cabecalho = new paragrafo({
    children: [
      new texto({
        text: `Guarujá, ${data.getDate()} de ${
          meses[data.getMonth()]
        } de ${data.getFullYear()}.`,
      }),
    ],
    alignment: docx.AlignmentType.RIGHT,
    style: 'normal',
    spacing: {
      line: 189 * 2,
    },
  });

  const doc = new docx.Document({
    creator: 'Batata - Lan house e Informática',
    title: 'Contrato de Compra e Venda de Bem Imóvel ' + dados.locadorNome,

    description:
      'Contrato de Compra e Venda de Bem Imóvel ' + dados.locadorNome,
    styles: {
      paragraphStyles: [
        {
          id: 'normal',
          name: 'normal',
          quickFormat: true,
          run: {
            font: 'Verdana',
            size: 14 * 2,
          },
        },
        {
          id: 'titulo',
          name: 'titulo',
          quickFormat: true,
          run: {
            font: 'Verdana',
            size: 18 * 2,
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
          espacoVazio,
          espacoVazio,
          espacoVazio,
          paragrafoTitulo('Declaração de Trabalho'),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          declaracao,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          new paragrafo({
            children: [
              new texto({
                text: '_____________________________________________',
              }),
            ],
            style: 'normal',
            spacing: {
              line: 276,
            },
            alignment: docx.AlignmentType.CENTER,
          }),
          new paragrafo({
            children: [new texto({ text: dados.declaranteNome, bold: true })],
            spacing: {
              line: 276,
            },
            alignment: docx.AlignmentType.CENTER,
          }),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          cabecalho,
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Declaração de Trabalho ${dados.declaranteNome}.docx`);
    console.log('Documento criado com sucesso');
  });
}
