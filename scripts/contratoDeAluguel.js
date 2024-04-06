import { resetaCampo, handleCEP, handleEndereco, meses } from './utils.js';

//#region SELETORES E EVENTOS

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);

const cep = document.getElementById('cep1');
const endereco = document.getElementById('endereco1');
const bairro = document.getElementById('bairro1');

const cepDois = document.getElementById('cep2');
const enderecoDois = document.getElementById('endereco2');
const bairroDois = document.getElementById('bairro2');

const cepTres = document.getElementById('cep3');
const enderecoTres = document.getElementById('endereco3');
const bairroTres = document.getElementById('bairro3');

cep.addEventListener('focus', resetaCampo);
cep.addEventListener('keyup', () => handleCEP(cep, endereco, bairro));
endereco.addEventListener('focusout', () =>
  handleEndereco(cep, endereco, bairro)
);

cepDois.addEventListener('focus', resetaCampo);
cepDois.addEventListener('keyup', () =>
  handleCEP(cepDois, enderecoDois, bairroDois)
);
enderecoDois.addEventListener('focusout', () =>
  handleEndereco(cepDois, enderecoDois, bairroDois)
);

cepTres.addEventListener('focus', resetaCampo);
cepTres.addEventListener('keyup', () =>
  handleCEP(cepTres, enderecoTres, bairroTres)
);
enderecoTres.addEventListener('focusout', () =>
  handleEndereco(cepTres, enderecoTres, bairroTres)
);
//#endregion

//HANDLERS

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
          underline: {
            type: docx.UnderlineType.SINGLE,
            color: 'auto',
          },
        }),
      ],
      style: 'titulo',
      alignment: docx.AlignmentType.CENTER,
    });

  const objetoAlugado = new paragrafo({
    children: [
      new texto({
        text: 'OBJETO DE LOCAÇÃO: ',
        bold: true,
      }),
      new texto('Imóvel localizado a '),
      new texto({
        text: `${dados.objetoEndereco}, nº ${dados.objetoNumero}, ${dados.objetoBairro}, Cidade de ${dados.objetoCidade} - Estado de ${dados.objetoEstado}.`,
        bold: true,
      }),
    ],
    style: 'normal',
    spacing: {
      line: 276,
    },
  });

  const valorAlugado = new paragrafo({
    children: [
      new texto({
        text: `VALOR MENSAL DA LOCAÇÃO: R$ ${dados.valorMensal} `,
        bold: true,
      }),
      new texto(
        `(${dados.valorMensal
          .split(',')[0]
          .extenso()} reais) mensais tendo como vencimento todo dia `
      ),
      new texto({
        text: `${dados.diaDeVencimento} `,
        bold: true,
      }),
      new texto(`de cada mês.`),
    ],
    style: 'normal',
    spacing: {
      line: 276,
    },
  });

  const prazoDeLocacao = new paragrafo({
    children: [
      new texto({
        text: `PRAZO DE LOCAÇÃO: ${dados.prazoDeLocacao} `,
        bold: true,
      }),
      new texto(`a iniciar-se no dia `),
      new texto({
        text: `${dados.dataDeInicio} `,
        bold: true,
      }),
      new texto(`e terminando no dia `),
      new texto({
        text: `${dados.dataDeTermino}.`,
        bold: true,
      }),
    ],
    style: 'normal',
    spacing: {
      line: 276,
    },
  });

  const participante = (
    isLocatario,
    genero,
    nome,
    rg,
    cpf,
    endereco,
    numero,
    bairro,
    cep
  ) => {
    let titulo;
    if (isLocatario) {
      titulo = genero == 'o' ? 'LOCATÁRIO' : 'LOCATÁRIA';
    } else {
      titulo = genero == 'o' ? 'LOCADOR' : 'LOCADORA';
    }
    let paragraphArray = [];

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new docx.Paragraph({
        children: [
          new texto({
            text: `${titulo}: ${nome}`,
            bold: true,
          }),
          new texto(
            `, brasileir${genero}, ${
              genero == 'o' ? 'portador' : 'portadora'
            } do`
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
      })
    );

    return paragraphArray;
  };

  const espacoVazio = new paragrafo({ text: '' });

  const assinatura = () => {
    let paragraphArray = [];

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new paragrafo({
        children: [
          new texto({
            text: `Locatári${dados.locatarioGenero == 'a' ? 'a' : 'o'}`,
            bold: true,
          }),
        ],
        style: 'normal',
        spacing: {
          line: 276,
        },
      })
    );

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new paragrafo({
        children: [
          new texto({
            text: '_____________________________________________',
            bold: true,
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
        children: [
          new texto({
            text: `${dados.locatarioNome}`,
            bold: true,
          }),
        ],
        style: 'normal',
      })
    );

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new paragrafo({
        children: [
          new texto({
            text: `Locador${dados.locadorGenero == 'a' ? 'a' : ''}`,
            bold: true,
          }),
        ],
        style: 'normal',
        spacing: {
          line: 276,
        },
      })
    );

    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));
    paragraphArray.push(new docx.Paragraph(new texto('')));

    paragraphArray.push(
      new paragrafo({
        children: [
          new texto({
            text: '_____________________________________________',
            bold: true,
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
        children: [
          new texto({
            text: `${dados.locadorNome}`,
            bold: true,
          }),
        ],
        style: 'normal',
      })
    );

    return paragraphArray;
  };

  const data = new Date();

  // const paragrafoLinha = new paragrafo({
  //   children: [
  //     new texto({
  //       text: '_____________________________________________',
  //     }),
  //   ],
  //   style: 'normal',
  //   spacing: {
  //     line: 276,
  //   },
  // });

  const doc = new docx.Document({
    creator: 'Batata - Lan house e Informática',
    title: 'Contrato de Aluguel ' + dados.locadorNome,
    description: 'Contrato de Aluguel ' + dados.locadorNome,
    numbering: {
      config: [
        {
          reference: 'bolinha',
          levels: [
            {
              level: 0,
              format: 'bullet',
              text: '•',
              alignment: docx.AlignmentType.CENTER,
              run: {
                bold: true,
              },
              style: {
                paragraph: {
                  indent: {
                    left: '0.9cm',
                  },
                },
              },
            },
          ],
        },
      ],
    },
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
            size: 12 * 2,
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: '1.75cm',
              right: '1.9cm',
              bottom: '1.25cm',
              left: '1.9cm',
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
          espacoVazio,
          espacoVazio,
          paragrafoTitulo('Contrato de Locação'),
          espacoVazio,
          ...participante(
            true,
            dados.locatarioGenero,
            dados.locatarioNome,
            dados.locatarioRg,
            dados.locatarioCpf,
            dados.locatarioEndereco,
            dados.locatarioNumero,
            dados.locatarioBairro,
            dados.locatarioCep
          ),
          ...participante(
            false,
            dados.locadorGenero,
            dados.locadorNome,
            dados.locadorRg,
            dados.locadorCpf,
            dados.locadorEndereco,
            dados.locadorNumero,
            dados.locadorBairro,
            dados.locadorCep
          ),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          objetoAlugado,
          espacoVazio,
          valorAlugado,
          espacoVazio,
          espacoVazio,
          prazoDeLocacao,
          espacoVazio,
          new paragrafo({
            children: [
              new texto(`As contas de Luz e Água`),
              new texto({
                text: `${
                  !dados.luzEAguaInclusas ? ' não ' : ' '
                }estão inclusas no valor do aluguel.`,
                bold: true,
              }),
            ],
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Se houver quebra de contrato pelo LOCATÁRI${
              dados.locatarioGenero == 'o' ? 'O' : 'A'
            }, implicará em multa de ${
              dados.multaPorQuebra
            }% do restante dos meses que estarão falando no contrato.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Após o vencimento, ocorrerá multa de ${dados.multaPorAtraso}% do valor total mensal do aluguel ao dia.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `O imóvel destina-se exclusivamente para uso residencial, sendo vedada qualquer outra forma de utilização.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Manter o Imóvel no mais perfeito estado de limpeza e conservação para assim restituir A${
              dados.locadorGenero == 'o' ? 'O' : ''
            } LOCADOR${
              dados.locadorGenero == 'o' ? '' : 'A'
            }, quando finda ou recendida a locação, correndo por sua conta exclusiva as despesas necessárias para esse fim, notadamente, as que se referem à conservação.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Não transferir este contrato, não sublocar, não ceder ou emprestar sob qualquer pretexto e de igual forma alterar o objetivo de locação.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Encaminhar A${
              dados.locadorGenero == 'o' ? 'O' : ''
            } LOCADOR${
              dados.locadorGenero == 'o' ? '' : 'A'
            } todas as notificações, avisos ou intimações dos poderes públicos que forem entregues no imóvel, sob pena de responder pelas multas, correção monetária e penalidades decorrentes do atraso o pagamento ou satisfação no cumprimento de determinação por aqueles poderes.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Facultar A${dados.locadorGenero == 'o' ? 'O' : ''} LOCADOR${
              dados.locadorGenero == 'o' ? '' : 'A'
            }, ou ao seu representante legal examinar ou vistoriar o imóvel sempre que for para tanto solicitado.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            text: `Findo o prazo deste contrato, por ocasião da entrega das chaves, ${
              dados.locadorGenero == 'o' ? 'O' : 'A'
            } LOCADOR${
              dados.locadorGenero == 'o' ? '' : 'A'
            } mandará fazer uma vistoria no imóvel locado, a fim de verificar se o mesmo se acha nas condições que foi recebido, pel${
              dados.locatarioGenero == 'o' ? 'o' : 'a'
            } LOCATÁRI${dados.locatarioGenero == 'o' ? 'O' : 'A'}.`,
            numbering: {
              reference: 'bolinha',
              level: 0,
            },
            style: 'normal',
          }),
          espacoVazio,
          new paragrafo({
            children: [
              new texto(
                'E por estarem assim justos e contratados, assinam o presente instrumento em 02 (duas) vias de igual forma e teor, na presença das testemunhas igualmente abaixo assinadas.'
              ),
            ],
            // indent: {
            //   firstLine: '1.25cm',
            // },
          }),
          espacoVazio,
          espacoVazio,
          espacoVazio,
          espacoVazio,
          new paragrafo({
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
          }),
          ...assinatura(),
        ],
      },
    ],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Contrato de Aluguel ${dados.locadorNome}.docx`);
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
