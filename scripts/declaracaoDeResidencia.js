import { meses, resetaCampo } from './utils.js';

//#region SELETORES E EVENTOS

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

const cep = document.getElementById('cep');
cep.addEventListener('focusout', formataCEP);
cep.addEventListener('focus', resetaCampo);
cep.addEventListener('keyup', handleCEP);

const endereco = document.getElementById('endereco');
endereco.addEventListener('keydown', handleEndereco);

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

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  gen(formJSON);
}

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
      spacing: {
        // after: convertePt(65),
      },
      alignment: docx.AlignmentType.CENTER,
    });

  const paragrafoDeclaracao = new paragrafo({
    children: [
      new texto('Eu, '),
      new texto({ text: dados.nome, bold: true }),
      new texto(
        `, brasileir${dados.genero}, ${
          dados.genero == 'o' ? 'portador' : 'portadora'
        } do`
      ),
      new texto({ text: ` RG ${dados.rg}`, bold: true }),
      new texto(` e inscrit${dados.genero} no CPF de`),
      new texto({ text: ` nº ${dados.cpf}`, bold: true }),
      new texto(`, residente e domiciliad${dados.genero} a `),
      new texto({
        text: `${dados.endereco}, nº ${dados.numero}, ${dados.bairro} – Guarujá/SP, CEP: ${dados.cep}`,
        bold: true,
      }),
      new texto(
        ' Declaro para os devidos fins de comprovação de residência, sob as penas da'
      ),
      new texto({ text: ' Lei 7.115/83, artigo 2º', bold: true }),
      new texto(' que'),
      new texto({
        text: ` ${dados.nome2}`,
        bold: true,
      }),
      new texto(
        `, ${dados.genero2 == 'o' ? 'portador' : 'portadora'} do RG de nº `
      ),
      new texto({ text: dados.rg2, bold: true }),
      new texto(` e inscrit${dados.genero2} no CPF de`),
      new texto({ text: ` nº ${dados.cpf2}.`, bold: true }),
      new texto({
        text: ' reside no endereço citado acima.',
      }),
    ],
    indent: {
      firstLine: '1.25cm',
    },
    style: 'normal',

    spacing: {
      line: 360,
      // after: 280 * 2,
    },
  });

  const espacoVazio = new paragrafo({ text: '' });

  const paragrafoDepois = new paragrafo({
    children: [
      new texto({
        text: 'Por expressão da verdade assumido inteira responsabilidade pelas declarações acima, as penas da lei assino para que produza seus efeitos legais.',
        bold: true,
      }),
    ],
    style: 'normal',
    indent: {
      firstLine: '1.25cm',
    },
    spacing: {
      line: 360,
      // after: convertePt(35),
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
      // after: convertePt(35),
    },
  });

  const paragrafoLinha = new paragrafo({
    children: [
      new texto({ text: '_______________________________', bold: true }),
    ],
    style: 'normal',
    alignment: docx.AlignmentType.CENTER,
    spacing: {
      // after: convertePt(5),
    },
  });

  const paragrafoDepoisLinha = new paragrafo({
    children: [new texto({ text: dados.nome, bold: true })],
    alignment: docx.AlignmentType.CENTER,
  });

  const doc = new docx.Document({
    creator: 'Batata - Lan house e Informática',
    title: 'Declaração de Residência ' + dados.nome,

    description: 'Declaração de Residência',
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
              top: '1.70cm',
              right: '3cm',
              bottom: '0cm',
              left: '3cm',
            },
            borders: {
              pageBorderLeft: {
                style: docx.BorderStyle.SINGLE,
                size: 3,
                color: 'auto',
                space: 24,
              },
              pageBorderRight: {
                style: docx.BorderStyle.SINGLE,
                size: 3,
                color: 'auto',
                space: 24,
              },
              pageBorderTop: {
                style: docx.BorderStyle.SINGLE,
                size: 3,
                color: 'auto',
                space: 24,
              },
              pageBorderBottom: {
                style: docx.BorderStyle.SINGLE,
                size: 3,
                color: 'auto',
                space: 24,
              },

              pageBorders: {
                display: 'allPages', //https://docx.js.org/api/enums/PageBorderDisplay.html
                offsetFrom: 'page', //https://docx.js.org/api/enums/PageBorderOffsetFrom.html
                zOrder: 'front', //https://docx.js.org/api/enums/PageBorderZOrder.html
              },
            },
          },
        },
        children: [
          paragrafoTitulo('Declaração de Residência'),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          paragrafoDeclaracao,
          espacoVazio,
          espacoVazio,
          paragrafoDepois,
          espacoVazio,
          espacoVazio,
          paragrafoAntesLinha,
          espacoVazio,
          espacoVazio,
          paragrafoLinha,
          paragrafoDepoisLinha,
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Declaração de Residência ${dados.nome}.docx`);
    console.log('Document created successfully');
  });
}
