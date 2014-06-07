// ==UserScript==
// @name        ikaDTabelle
// @namespace   ikaD
// @description dopo una bella avventura iniziamo a lavorare come si deve
// @author      ettoresiniscalchi
// @version     1.0.0
// @copyright   2012+, ettoresiniscalchiForPresident
//
// @history     1.0.0 qui mettiamo solo le tabelle
//
// @include     http://s*.ikariam.*/*
//
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js
// @require     https://raw.github.com/andris9/jStorage/master/jstorage.js
// @require     http://userscripts.org/scripts/source/132770.user.js
//
// ==/UserScript==

ikaD.vediEdifici = function() {
  var citta = ikaD.dsCitta;

  // Titoli
  var t = new Array();
  var i = 0;

  t[i] = new Array();
  t[i][0] = {
    v    : "città",
    cSpan: 2
  };
  // Titoli - nome edifici
  $.each(ikaD.elEdifici, function(k, e) {
    t[i][t[i].length] = {
      v    : e.nAbb,
      cSpan: 1
    };
  });

  //Dati delle singole città
  $.each(citta, function(k, c) {
    if (c.id != undefined)
      ikaD.vediEdificiCitta(t, c, ++i);
  });

  ikaD.disegnaTabella(t, "Edifici", "#js_cityLink", -400);

};
ikaD.vediEdificiCitta = function(t, c, i) {
  t[i] = new Array();
  t[i][0] = {
    v: ikaD.getXYCittaById(c.id),
    w: 30,
    a: "center",
    b: true
  };
  t[i][1] = {
    v: c.nome,
    w: 120,
    a: "left",
    b: true
  };
  var j0 = 2;
  var wDef = 28;
  // Inizializzo la tabella con i valori di default
  $.each(ikaD.elEdifici, function(k, e) {
    var j = j0 + e.i - 1;
    t[i][j] = {
      v: "-",
      w: wDef,
      a: "center",
      b: false
    };
  } );

  // Imposto i valori che ho memorizzato
  if (ikaD.dsEdifici[c.id] != undefined) {
    $.each(ikaD.dsEdifici[c.id], function(k, e) {
      var j = j0 + ikaD.elEdifici[e.edificio].i - 1;
      t[i][j].v = e.livello;
      t[i][j].b = e.inUp || e.maxUp;

      if (e.inUp) {       // Edifici in costruzione
        t[i][j].c = "clEdInUpS";

        var secondi = e.tempoUp - Math.floor(new Date().getTime()/1000);
        t[i][j].title = ikaD.formattaGiornoDaS(secondi);
      } else if (e.maxUp) {
        t[i][j].c = "clEdMaxUpS";
      }
    });
  }
  return t;

};

ikaD.vediRisorse = function() {
  var citta = ikaD.dsCitta;

  // Titoli
  var t = new Array();
  var i = 0;

  t[i] = new Array();
  t[i][0] = {
    v    : "città",
    cSpan: 2
  };
  for (var j=0; j<ikaD.elTabRisorse.titoli.length; j++) {// Titoli - nome risorse
    t[i][j + 1] = {
      v    : '<img src=\'' + ikaD.elIcone[ikaD.elTabRisorse.titoli[j][0]] + '\'>',
      cSpan: ikaD.elTabRisorse.titoli[j][1]
    };
  }

  //Dati delle singole città
  var cTot = ikaD.initRisorseTotali();
  $.each(citta, function(k, c) {
    if (c.id != undefined) {
      var r = ikaD.dsRisorse[c.id];
      var consumoVino = ikaD.vinoConsTot(c.id);
      ikaD.calcolaRisorseTotali(cTot, r, consumoVino);
      ikaD.vediRisorseCitta(t, c, r, ++i, consumoVino);
    }
  });
  ikaD.vediRisorseCitta(t, cTot, cTot.r, ++i, cTot.consumoVino);

  ikaD.disegnaTabella(t, "Risorse", "#js_worldMapLink", -200);

};
ikaD.vediRisorseCitta = function(t, c, r, i, consumoVino) {
  var wDef     = 65;
  var wDefProd = 45;

  t[i] = new Array();
  //per i totali metto la riga colorata
  if (!ikaD.getXYCittaById(c.id)) t[i].stileRiga = true;

  t[i][0] = {
    v: ikaD.getXYCittaById(c.id),
    w: 30,
    a: "center",
    b: true
  };
  t[i][1] = {
    v: c.nome,
    w: 120,
    a: "left",
    b: true
  };

  //Inizializzo la tabella
  for (var j=0; j<ikaD.elTabRisorse.titoli.length; j++) {// Titoli - nome risorse
    for (var j0=0; j0<ikaD.elTabRisorse.titoli[j][1]; j0++) {// Titoli - nome risorse
      t[i][t[i].length] = {
        v: "-",
        w: wDef,
        a: "right",
        b: false
      };
    }
  }

  j0 = 2;

  var vOut = '';
  if (ikaD.getXYCittaById(c.id)) {
    var l = [[ikaD.elIcone['isola'],'?view=island&islandId=' + c.islandId],
    [ikaD.elIcone['r0C'],'?view=resource&type=resource&islandId=' + c.islandId],
    [ikaD.elIcone['r' + c.iRisorsa + 'C'],'?view=tradegood&type=' + c.iRisorsa + '&islandId=' + c.islandId]
    ];
    var u = c.islandId != undefined;
    for (iL=0; iL<l.length; iL++) {
      if (u) vOut += '<a href=\'' + l[iL][1] + '\'>';
      vOut += '<img height=\'20px\' src=\'' + l[iL][0] + '\'>';
      if (u) vOut += '</a>';
    }
  } else {
    vOut = '&nbsp;';
  }
  t[i][j0].v = vOut;
  t[i][j0].a = 'center';
  t[i][j0].w = 120;

  if (r) {
    t[i][j0 +  1].v = ikaD.formattaNumero(r.abitanti.totali);
    t[i][j0 +  2].v = ikaD.formattaNumero(r.abitanti.liberi);
    t[i][j0 +  3].v = ikaD.formattaNumero(r.abitanti.liberi * 3);
    t[i][j0 +  4].v = ikaD.formattaNumero(r.possedute.legno);
    t[i][j0 +  5].v = ikaD.formattaNumero(r.prodotte.legno);
    t[i][j0 +  6].v = ikaD.formattaNumero(r.possedute.vino);
    t[i][j0 +  7].v = ikaD.formattaNumero(r.prodotte.vino);
    t[i][j0 +  8].v = consumoVino == 0 ? 0 : ikaD.formattaNumero(-consumoVino);
    t[i][j0 +  9].v = ikaD.formattaNumero(r.possedute.marmo);
    t[i][j0 + 10].v = ikaD.formattaNumero(r.prodotte.marmo);
    t[i][j0 + 11].v = ikaD.formattaNumero(r.possedute.cristallo);
    t[i][j0 + 12].v = ikaD.formattaNumero(r.prodotte.cristallo);
    t[i][j0 + 13].v = ikaD.formattaNumero(r.possedute.zolfo);
    t[i][j0 + 14].v = ikaD.formattaNumero(r.prodotte.zolfo);

  }
  t[i][j0 +  2].w = wDefProd;
  t[i][j0 +  5].w = wDefProd;
  t[i][j0 +  7].w = wDefProd;
  t[i][j0 +  8].w = wDefProd;
  t[i][j0 + 10].w = wDefProd;
  t[i][j0 + 12].w = wDefProd;
  t[i][j0 + 14].w = wDefProd;

  t[i][j0 +  2].c = 'clProdFont clProdColor';
  t[i][j0 +  5].c = 'clProdFont clProdColor'     + (t[i][j0 +  5].v == 0 ? ' clProdColor0' : '');
  t[i][j0 +  7].c = 'clProdFont clProdColor'     + (t[i][j0 +  7].v == 0 ? ' clProdColor0' : '');
  t[i][j0 +  8].c = 'clProdFont clProdColorVino' + (t[i][j0 +  8].v == 0 ? ' clProdColor0' : '');
  t[i][j0 + 10].c = 'clProdFont clProdColor'     + (t[i][j0 + 10].v == 0 ? ' clProdColor0' : '');
  t[i][j0 + 12].c = 'clProdFont clProdColor'     + (t[i][j0 + 12].v == 0 ? ' clProdColor0' : '');
  t[i][j0 + 14].c = 'clProdFont clProdColor'     + (t[i][j0 + 14].v == 0 ? ' clProdColor0' : '');

    if (r){
    //vino
    if (r.possedute.vino + (r.prodotte.vino*12) <= (consumoVino*12)) {
      t[i][j0 + 8].c += ' clVinoDeficit12';
    } else if (r.possedute.vino + (r.prodotte.vino*24) <= (consumoVino*24)) {
      t[i][j0 + 8].c += ' clVinoDeficit24';
    }
    }

  return t;

}

ikaD.initRisorseTotali = function(){
  var cTot = {
    nome: "Totale",
    id:"totale",
    iRisorsa: 0,
    consumoVino: 0,
    r:{
      abitanti:{},
      possedute:{},
      prodotte:{}
    }
  }

  cTot.r.abitanti.totali=0;
  cTot.r.abitanti.liberi=0;

  cTot.r.possedute.legno    = 0;
  cTot.r.prodotte.legno     = 0;
  cTot.r.possedute.vino     = 0;
  cTot.r.prodotte.vino      = 0;
  cTot.r.possedute.marmo    = 0;
  cTot.r.prodotte.marmo     = 0;
  cTot.r.possedute.cristallo= 0;
  cTot.r.prodotte.cristallo = 0;
  cTot.r.possedute.zolfo    = 0;
  cTot.r.prodotte.zolfo     = 0;

  return cTot;
};
ikaD.calcolaRisorseTotali = function(cTot, r, consumoVino){
  if (!(cTot.id)) {
    cTot = ikaD.initRisorseTotali(cTot);
  }

  if (r){
    cTot.r.abitanti.totali += r.abitanti.totali;
    cTot.r.abitanti.liberi += r.abitanti.liberi;

    cTot.r.possedute.legno      += r.possedute.legno;
    cTot.r.prodotte.legno       += r.prodotte.legno;
    cTot.r.possedute.vino       += r.possedute.vino;
    cTot.r.prodotte.vino        += r.prodotte.vino;
    cTot.r.possedute.marmo      += r.possedute.marmo;
    cTot.r.prodotte.marmo       += r.prodotte.marmo;
    cTot.r.possedute.cristallo  += r.possedute.cristallo;
    cTot.r.prodotte.cristallo   += r.prodotte.cristallo;
    cTot.r.possedute.zolfo      += r.possedute.zolfo;
    cTot.r.prodotte.zolfo       += r.prodotte.zolfo;

    cTot.consumoVino += consumoVino;
  }
  return cTot;

};

ikaD.elTabRisorse={};
ikaD.elTabRisorse.titoli = [
  ['rProdotta',1],
  ['abitanti' ,2],
  ['oro'      ,1],
  ['legno'    ,2],
  ['vino'     ,3],
  ['marmo'    ,2],
  ['cristallo',2],
  ['zolfo'    ,2]
  ];

$(document).ready(function() {
  ikaD.opzioni.settaValore('vediEdifici', true);
  ikaD.opzioni.settaValore('vediRisorse', true);
  if (ikaD.dsOpzioni.vediEdifici)
    ikaD.vediEdifici();
  if (ikaD.dsOpzioni.vediRisorse)
    ikaD.vediRisorse();
});