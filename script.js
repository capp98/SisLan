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

window.onload = function () {
  adicionaBoletos();

  adicionaDocumentos();

  adicionaServicos();
};

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

    if (infoFound.extras !== undefined) {
      let li = null;
      let t3 = null;

      if (infoFound.extras.preco !== undefined) {
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

      if (infoFound.extras.necessario !== undefined) {
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

      if (infoFound.extras.entrega !== undefined) {
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

      let link = document.createElement('a');
      link.innerHTML = 'Ir';
      link.href = a.href;
      infosWindows.appendChild(link);

      document.getElementById('windowInfos').style.display = 'block';
    }
  }
}

let boletos = [
  {
    url: 'https://web.whatsapp.com/send/?phone=5513997786129&text=Oi',
    nome: 'master net (whatsapp)',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'http://central.niufibra.com.br:8080/sac/login/?sys=SAC',
    nome: 'niufibra',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'https://web.whatsapp.com/send/?phone=551340099070&text=Oi',
    nome: 'niufibra (whatsapp)',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'https://sac.desktop.com.br/Cliente_Documento.jsp',
    nome: 'desktop',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'https://web.whatsapp.com/send/?phone=551935143100&text=Oi',
    nome: 'desktop (whatsapp)',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'https://intranet.intervel.com.br/central_assinante_web/',
    nome: 'intranet connect',
    servico: 'boleto',
    tipo: 'internet',
  },
  {
    url: 'https://agencia.neoenergiaelektro.com.br/login.aspx',
    nome: 'elektro',
    servico: 'boleto',
    tipo: 'governo',
  },
  {
    url: 'https://casasbahia.digital/',
    nome: 'casas bahia',
    servico: 'boleto',
    tipo: 'cartão',
  },
  {
    url: 'https://fatura-facil.claro.com.br/',
    nome: 'claro',
    servico: 'boleto',
    tipo: 'celular',
  },
  {
    url: 'https://scimpmgsp.geometrus.com.br/digits',
    nome: 'IPTU (Guarujá)',
    servico: 'boleto',
    tipo: 'governo',
  },
  {
    url: 'http://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao',
    nome: 'MEI',
    servico: 'boleto',
    tipo: 'governo',
  },
  {
    url: 'https://www.enel.com.br/pt/login',
    nome: 'enel',
    servico: 'boleto',
    tipo: '',
  },
  {
    url: 'https://sal.rfb.gov.br/PortalSalInternet/faces/pages/calcContribuicoesCI/filiadosApos/exibirDadosCadastraisCIApos.xhtml',
    nome: 'SAL (sistema de acréscimos legais)',
    servico: 'boleto',
    tipo: 'governo',
  },
  {
    url: 'https://pf.santandernet.com.br/LOGBBR_NS_ENS/ChannelDriver.ssobto?dse_contextRoot=true#',
    nome: 'santander',
    servico: 'boleto',
    tipo: 'banco',
  },
  {
    url: 'https://www.portaldafatura.com.br/boleto-rapido/login',
    nome: 'credsystem',
    servico: 'boleto',
    tipo: 'cartão',
  },
  {
    url: 'https://cdhuonline.cdhu.sp.gov.br/',
    nome: 'CDHU',
    servico: 'boleto',
    tipo: 'governo',
  },
  {
    url: 'https://fatura.credz.com.br/login',
    nome: 'CredZ',
    servico: 'boleto',
    tipo: 'cartão',
  },
  {
    url: 'http://anacostasaude.com.br/boleto_acesso.php',
    nome: 'tim',
    servico: 'boleto',
    tipo: 'celular',
  },
  {
    url: 'https://empresas.unimedsantos.coop.br/auth/login',
    nome: 'unimed',
    servico: 'boleto',
    tipo: '',
  },
  {
    url: 'https://www.poupatempo.sp.gov.br/wps/myportal/poupatempoTaOn/servicos/sabesp/segundaViaContaSabesp/',
    nome: 'sabesp',
    servico: 'boleto',
    tipo: 'poupatempo',
  },
];

let documentos = [
  {
    url: 'https://www.tse.jus.br/servicos-eleitorais/certidoes/certidao-de-quitacao-eleitoral',
    nome: 'quitação eleitoral',
    servico: 'documento',
    tipo: 'titulo eleitoral',
  },
  {
    url: 'https://entregadeexames.com.br/',
    nome: 'entrega de exames',
    servico: 'documento',
    tipo: 'exames',
  },
  {
    url: 'https://esaj.tjsp.jus.br/sco/abrirCadastro.do',
    nome: 'certidão de execução criminal',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'http://www2.ssp.sp.gov.br/atestado/novo/Atestado02.cfm',
    nome: 'antecedente criminal estadual',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'https://antecedentes.dpf.gov.br/antecedentes-criminais/certidao',
    nome: 'antecedente criminal federal',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'http://www.radarconsultas.com.br/',
    nome: 'radar consultas',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp',
    nome: 'situação cadastral do cpf',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'http://bopm.policiamilitar.sp.gov.br/',
    nome: 'boletim de ocorrência militar',
    servico: 'documento',
    tipo: 'policia militar',
  },
  {
    url: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br/ssp-de-cidadao/home',
    nome: 'boletim de ocorrência',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'https://sisparnet.pgfn.fazenda.gov.br/sisparInternet/internet/darf/consultaParcelamentoDarfInternet.xhtml',
    nome: 'DARF',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'https://esaj.tjsp.jus.br/esaj/portal.do?servico=190090',
    nome: 'processos de justiça',
    servico: 'documento',
    tipo: '',
  },
  {
    url: 'https://www.detran.sp.gov.br/wps/myportal/portaldetran/cidadao/veiculos/servicos/solicitacaoLicenciamentoCRLVDigital/!ut/p/z1/pZHLDoIwEEU_qbe0Ie2yYqG8gvgA7MawMk0UXRi_X2FnohXj7CY5Z2Zyh1jSETv0d3fsb-4y9Kdnv7fhgVOpKY1QVo3RqE1s6AoCSEDaCWAcG7mgCmBGQIn11qgCFDwk9h8_4T_6Qjfx6LOY6ipAjnl-ViMyRgRFQpcRlOS8TLOcQbJ5Pj6UmrnfA1j_-JbYCfF9wAuMEb8CbzKcAF9I3868nndjdXCpewBJp-N9/p0/IZ7_419E11C0MOVHE0QHFH1P080040=CZ6_419E11C0MOVHE0QHFH1P0800G0=LAJyVsOUda88e_ef0lSMUbB4hXrPWHSJ9q78R9UUcGbEbPHgd9A=Ejavax.servlet.include.path_info!QCPpagesQCPlicenciamentoCRLVDigitalQCPprePesquisaView.xhtml==/#Z7_419E11C0MOVHE0QHFH1P080040',
    nome: 'CRLV-E licenciamento de veículo',
    servico: 'documento',
    tipo: 'detran',
    extras: {
      preco: 'R$ 10,00 ; R$ 20,00 se não souber a conta Detran',
      necessario: 'Senha Detran ; Acesso ao celular ou e-mail do proprietário',
      entrega: 'Duas cópias do documento',
    },
  },
  {
    url: 'https://www.detran.sp.gov.br/wps/myportal/portaldetran/cidadao/habilitacao/servicos/consultaPontos',
    nome: 'certidão de pontos na CNH',
    servico: 'documento',
    tipo: 'detran',
    extras: {
      preco: 'R$ 5,00;R$ 20,00 se não souber a conta Detran',
      necessario: 'Senha Detran;Acesso ao celular ou e-mail do proprietário',
      entrega: 'Duas cópias do documento',
    },
  },
];

let servicos = [
  {
    url: '/SisLan/pages/cv.html',
    nome: 'currículo',
    servico: 'serviço',
    tipo: 'documento',
    extras: {
      preco: 'R$ 8,00 - PDF ou 5 Cópias;R$ 10,00 - PDF + 5 Cópias',
    },
  },
  {
    url: '/SisLan/pages/proof-of-residence.html',
    nome: 'declaração de residência',
    servico: 'serviço',
    tipo: 'documento',
  },
  {
    url: 'https://online-audio-converter.com/pt/',
    nome: 'conversor de áudio',
    servico: 'serviço',
    tipo: 'conversor',
  },
  {
    url: 'https://www.ilovepdf.com/pt',
    nome: 'editor de pdf',
    servico: 'serviço',
    tipo: 'conversor',
  },
  {
    url: 'https://www.tse.jus.br/servicos-eleitorais/autoatendimento-eleitoral#/',
    nome: 'Autoatendimento eleitoral',
    servico: 'serviço',
    tipo: 'conversor',
  },
];
