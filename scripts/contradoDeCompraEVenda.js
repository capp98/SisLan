let compradorIndex = 1;
let vendedorIndex = 1;

import {
  meses,
  convertePt,
  formataCPF,
  formataRG,
  formataTexto,
  resetaCampo,
  handleCEP,
  // handleEndereco,
} from './utils.js';

//#region SELETORES E EVENTOS

const divCompradores = document.querySelector('div.compradoresField');
const divVendedores = document.querySelector('div.vendedoresField');

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

const cep = document.getElementById('cep1');
const endereco = document.getElementById('endereco1');
const bairro = document.getElementById('bairro1');
const cidade = document.getElementById('cidade1');
const estado = document.getElementById('estado1');

const cepDois = document.getElementById('cep2');
const enderecoDois = document.getElementById('endereco2');
const bairroDois = document.getElementById('bairro2');
const cidadeDois = document.getElementById('cidade2');
const estadoDois = document.getElementById('estado2');

const cepTres = document.getElementById('cep3');
const enderecoTres = document.getElementById('endereco3');
const bairroTres = document.getElementById('bairro3');
const cidadeTres = document.getElementById('cidade3');
const estadoTres = document.getElementById('estado3');

cep.addEventListener('focus', resetaCampo);
cep.addEventListener('keyup', () =>
  handleCEP(cep, endereco, bairro, cidade, estado)
);
// endereco.addEventListener('focusout', () =>
//   handleEndereco(cep, endereco, bairro)
// );

cepDois.addEventListener('focus', resetaCampo);
cepDois.addEventListener('keyup', () =>
  handleCEP(cepDois, enderecoDois, bairroDois, cidadeDois, estadoDois)
);
// enderecoDois.addEventListener('focusout', () =>
//   handleEndereco(cepDois, enderecoDois, bairroDois, cidade, estado)
// );

cepTres.addEventListener('focus', resetaCampo);
cepTres.addEventListener('keyup', () =>
  handleCEP(cepTres, enderecoTres, bairroTres, cidadeTres, estadoTres)
);
// enderecoTres.addEventListener('focusout', () =>
//   handleEndereco(cepTres, enderecoTres, bairroTres)
// );

const bAdicionarVendedor = document.querySelector('input.adicionarVendedor');
bAdicionarVendedor.addEventListener('click', addVendedor);

const bAdicionarComprador = document.querySelector('input.adicionarComprador');
bAdicionarComprador.addEventListener('click', addComprador);

//#endregion

//HANDLERS

function addVendedor() {
  ++vendedorIndex;

  let fset = document.createElement('fieldset');
  fset.classList.add('vendedores');
  fset.style.marginTop = '15px';
  let legend = document.createElement('legend');
  legend.innerHTML = `Vendedor(a)`;
  // legend.innerHTML = `Vendedor ${vendedorIndex}`;
  fset.appendChild(legend);

  let labelHomem = document.createElement('label');
  let inputHomem = document.createElement('input');
  inputHomem.type = 'radio';
  inputHomem.value = 'o';
  inputHomem.id = `vendedor-h${vendedorIndex}`;
  inputHomem.checked = true;

  labelHomem.htmlFor = inputHomem.id;
  labelHomem.className = 'inline';
  inputHomem.setAttribute('name', `vendedor-genero${vendedorIndex}`);
  labelHomem.innerText = ' Homem';

  let labelMulher = document.createElement('label');
  let inputMulher = document.createElement('input');
  inputMulher.type = 'radio';
  inputMulher.value = 'a';
  inputMulher.id = `vendedor-m${vendedorIndex}`;
  inputMulher.setAttribute('name', `vendedor-genero${vendedorIndex}`);

  labelMulher.htmlFor = inputMulher.id;
  labelMulher.className = 'inline';
  labelMulher.innerText = ' Mulher';

  let labelNome = document.createElement('label');
  let inputNome = document.createElement('input');
  inputNome.addEventListener('focusout', formataTexto);

  inputNome.id = `nome${vendedorIndex}`;

  labelNome.htmlFor = inputNome.id;
  labelNome.innerText = 'Nome';

  let labelRg = document.createElement('label');
  let inputRg = document.createElement('input');
  inputRg.addEventListener('focus', resetaCampo);
  inputRg.addEventListener('focusout', formataRG);
  inputRg.maxLength = '9';

  inputRg.id = `rg${vendedorIndex}`;

  labelRg.htmlFor = inputRg.id;
  labelRg.innerText = 'Rg';

  let labelCpf = document.createElement('label');
  let inputCpf = document.createElement('input');
  inputCpf.addEventListener('focus', resetaCampo);
  inputCpf.addEventListener('focusout', formataCPF);
  inputCpf.maxLength = '11';

  inputCpf.id = `cpf${vendedorIndex}`;

  labelCpf.htmlFor = inputCpf.id;
  labelCpf.innerText = 'Cpf';

  let buttonRemoveVendedor = document.createElement('button');
  buttonRemoveVendedor.type = 'button';
  buttonRemoveVendedor.className = 'botaoAcao';
  buttonRemoveVendedor.value = vendedorIndex;
  buttonRemoveVendedor.innerText = 'Remover Vendedor';
  // buttonRemoveVendedor.innerText = 'Remover Vendedor ' + vendedorIndex;
  buttonRemoveVendedor.addEventListener('click', () => {
    divVendedores.removeChild(fset);
    vendedorIndex--;
  });

  fset.appendChild(inputHomem);
  fset.appendChild(labelHomem);
  fset.appendChild(inputMulher);
  fset.appendChild(labelMulher);
  fset.appendChild(labelNome).appendChild(inputNome);
  fset.appendChild(labelRg).appendChild(inputRg);
  fset.appendChild(labelCpf).appendChild(inputCpf);
  fset.appendChild(buttonRemoveVendedor);

  divVendedores.append(fset);
}

function addComprador() {
  ++compradorIndex;

  let fset = document.createElement('fieldset');
  fset.classList.add('compradores');
  fset.style.marginTop = '15px';
  let legend = document.createElement('legend');
  legend.innerHTML = `Comprador(a)`;
  // legend.innerHTML = `Vendedor ${vendedorIndex}`;
  fset.appendChild(legend);

  let labelHomem = document.createElement('label');
  let inputHomem = document.createElement('input');
  inputHomem.type = 'radio';
  inputHomem.value = 'o';
  inputHomem.id = `comprador-h${compradorIndex}`;
  inputHomem.checked = true;

  labelHomem.htmlFor = inputHomem.id;
  labelHomem.className = 'inline';
  inputHomem.setAttribute('name', `comprador-genero${compradorIndex}`);
  labelHomem.innerText = ' Homem';

  let labelMulher = document.createElement('label');
  let inputMulher = document.createElement('input');
  inputMulher.type = 'radio';
  inputMulher.value = 'a';
  inputMulher.id = `comprador-m${compradorIndex}`;
  inputMulher.setAttribute('name', `comprador-genero${compradorIndex}`);

  labelMulher.htmlFor = inputMulher.id;
  labelMulher.className = 'inline';
  labelMulher.innerText = ' Mulher';

  let labelNome = document.createElement('label');
  let inputNome = document.createElement('input');
  inputNome.addEventListener('focusout', formataTexto);

  inputNome.id = `nome${compradorIndex}`;

  labelNome.htmlFor = inputNome.id;
  labelNome.innerText = 'Nome';

  let labelRg = document.createElement('label');
  let inputRg = document.createElement('input');
  inputRg.addEventListener('focus', resetaCampo);
  inputRg.addEventListener('focusout', formataRG);
  inputRg.maxLength = '9';

  inputRg.id = `rg${compradorIndex}`;

  labelRg.htmlFor = inputRg.id;
  labelRg.innerText = 'Rg';

  let labelCpf = document.createElement('label');
  let inputCpf = document.createElement('input');
  inputCpf.addEventListener('focus', resetaCampo);
  inputCpf.addEventListener('focusout', formataCPF);
  inputCpf.maxLength = '11';

  inputCpf.id = `cpf${compradorIndex}`;

  labelCpf.htmlFor = inputCpf.id;
  labelCpf.innerText = 'Cpf';

  let buttonRemoveComprador = document.createElement('button');
  buttonRemoveComprador.type = 'button';
  buttonRemoveComprador.className = 'botaoAcao';
  buttonRemoveComprador.value = compradorIndex;
  buttonRemoveComprador.innerText = 'Remover Comprador';
  // buttonRemoveComprador.innerText = 'Remover Comprador ' + CompradorIndex;
  buttonRemoveComprador.addEventListener('click', () => {
    divCompradores.removeChild(fset);
    compradorIndex--;
  });

  fset.appendChild(inputHomem);
  fset.appendChild(labelHomem);
  fset.appendChild(inputMulher);
  fset.appendChild(labelMulher);
  fset.appendChild(labelNome).appendChild(inputNome);
  fset.appendChild(labelRg).appendChild(inputRg);
  fset.appendChild(labelCpf).appendChild(inputCpf);
  fset.appendChild(buttonRemoveComprador);

  divCompradores.append(fset);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  let vendedoresInput = document.querySelectorAll('.vendedores');
  let vendedoresList = [];
  vendedoresInput.forEach((c) => {
    let a = c.querySelectorAll('input');
    vendedoresList.push({
      genero: a[0].checked ? a[0].value : a[1].value,
      nome: a[2].value,
      rg: a[3].value,
      cpf: a[4].value,
    });
  });

  let compradoresInput = document.querySelectorAll('.compradores');
  let compradoresList = [];
  compradoresInput.forEach((c) => {
    let a = c.querySelectorAll('input');
    compradoresList.push({
      genero: a[0].checked ? a[0].value : a[1].value,
      nome: a[2].value,
      rg: a[3].value,
      cpf: a[4].value,
    });
  });

  formJSON.vendedores = vendedoresList;
  formJSON.compradores = compradoresList;
  console.log(formJSON);
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
      spacing: {},
      alignment: docx.AlignmentType.CENTER,
    });

  const assinatura = () => {
    let paragraphArray = [];

    dados.vendedores.forEach((vendedor) => {
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));

      paragraphArray.push(
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
        })
      );
      paragraphArray.push(
        new paragrafo({
          children: [new texto({ text: vendedor.nome, bold: true })],
          spacing: {
            line: 276,
          },
        }),
        new paragrafo({
          text: `(Assinatura d${vendedor.genero} Vendedor${
            vendedor.genero == 'a' ? 'a' : ''
          })`,
        })
      );
    });

    dados.compradores.forEach((comprador) => {
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));
      paragraphArray.push(new docx.Paragraph(new texto('')));

      paragraphArray.push(
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
        })
      );
      paragraphArray.push(
        new paragrafo({
          children: [new texto({ text: comprador.nome, bold: true })],
          spacing: {
            line: 276,
          },
        }),
        new paragrafo({
          text: `(Assinatura d${comprador.genero} Comprador${
            comprador.genero == 'a' ? 'a' : ''
          })`,
        })
      );
    });

    return paragraphArray;
  };

  const buildParagraph = (titulo, partes, endereco, numero, bairro, cep) => {
    let paragraphArray = [];

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new docx.Paragraph({
        children: [
          new texto({
            text: `${titulo}${
              partes.length > 1 ? 'es' : partes[0].genero == 'o' ? '' : 'a'
            }: ${partes[0].nome}`,
            bold: true,
          }),
          new texto(
            `, brasileir${partes[0].genero}, ${
              partes[0].genero == 'o' ? 'portador' : 'portadora'
            } do`
          ),
          new texto({ text: ` RG nº ${partes[0].rg}`, bold: true }),
          new texto(` e inscrit${partes[0].genero} no CPF de`),
          new texto({ text: ` nº ${partes[0].cpf}`, bold: true }),
        ],
      })
    );

    if (partes.length > 1) {
      for (let i = 1; i < partes.length; i++) {
        paragraphArray.push(
          new docx.Paragraph({
            children: [
              new texto(', e '),
              new texto({
                text: partes[i].nome,
                bold: true,
              }),
              new texto(
                `, brasileir${partes[i].genero}, ${
                  partes[i].genero == 'o' ? 'portador' : 'portadora'
                } do`
              ),
              new texto({ text: ` RG nº ${partes[i].rg}`, bold: true }),
              new texto(` e inscrit${partes[i].genero} no CPF de`),
              new texto({ text: ` nº ${partes[i].cpf}`, bold: true }),
            ],
          })
        );
      }
    }

    paragraphArray.push(
      new docx.Paragraph({
        children: [
          new texto(
            `, residente${partes.length > 1 ? 's' : ''} e domiciliad${
              partes.length > 1 ? 'os' : partes[0].genero
            } a `
          ),
          new texto({
            text: `${endereco}, nº ${numero}, ${bairro} – Guarujá/SP, CEP: ${cep}.`,
            bold: true,
          }),
        ],
      })
    );
    return paragraphArray;
  };

  const espacoVazio = new paragrafo({ text: '' });

  const paragrafoDepois = new paragrafo({
    children: [
      new texto({
        text: `Firmam entre si o presente contrato de venda e posse, pel${
          dados.vendedores.length > 1 ? 'os' : dados.vendedores[0].genero
        } `,
      }),

      new texto({
        text: `VENDEDOR${
          dados.vendedores.length > 1
            ? 'ES'
            : dados.vendedores[0].genero == 'a'
            ? 'A'
            : ''
        } `,
        bold: true,
      }),
      new texto({
        text: `e ${
          dados.compradores.length > 1 ? 'os' : dados.compradores[0].genero
        } `,
      }),
      new texto({
        text: `COMPRADOR${
          dados.compradores.length > 1
            ? 'ES'
            : dados.compradores[0].genero == 'a'
            ? 'A'
            : ''
        } `,
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
    title:
      'Contrato de Compra e Venda de Bem Imóvel ' + dados.compradores[0].nome,

    description:
      'Contrato de Compra e Venda de Bem Imóvel ' + dados.compradores[0].nome,
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
          ...buildParagraph(
            'Vendedor',
            dados.vendedores,
            dados.vendedorEndereco,
            dados.vendedorNumero,
            dados.vendedorBairro,
            dados.vendedorCep
          ),
          ...buildParagraph(
            'Comprador',
            dados.compradores,
            dados.compradorEndereco,
            dados.compradorNumero,
            dados.compradorBairro,
            dados.compradorCep
          ),
          espacoVazio,
          espacoVazio,
          paragrafoDepois,
          espacoVazio,
          espacoVazio,
          new paragrafo({
            children: [
              new texto({
                text: `No valor de `,
              }),
              new texto({
                text: `R$ ${dados.valor} `,
                bold: true,
              }),
              new texto({
                text: `(${dados.valor.split(',')[0].extenso()} reais).`,
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
                text: `${
                  dados.compradores.length > 1
                    ? 'Os'
                    : dados.compradores[0].genero
                } Comprador${
                  dados.compradores.length > 1
                    ? 'es'
                    : dados.compradores[0].genero2 == 'a'
                    ? 'a'
                    : ''
                } pag${dados.compradores.length > 1 ? 'aram' : 'ou'} a${
                  dados.vendedores.length > 1
                    ? 'os'
                    : dados.vendedores[0].genero == 'o'
                    ? 'o'
                    : ''
                } Vendedor${
                  dados.vendedores.length > 1
                    ? 'es'
                    : dados.genero == 'a'
                    ? 'a'
                    : ''
                } o valor de `,
              }),
              new texto({ text: `R$ ${dados.valor} `, bold: true }),
              new texto({
                text: `(${dados.valor.split(',')[0].extenso()} reais). ${
                  dados.formaDePagamento
                }. `,
              }),
            ],
            indent: {
              firstLine: '1.25cm',
            },
          }),
          ...assinatura(),
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
    saveAs(
      blob,
      `Contrato de Compra e Venda de Bem Imóvel ${dados.vendedores[0].nome}.docx`
    );
    console.log('Documento criado com sucesso');
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
      'cinquenta',
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
