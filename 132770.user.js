// ==UserScript==
// @name            IkaDBase
// @namespace       IkaD
// @description     dopo una bella avventura iniziamo a lavorare come si deve
// @author          d
// @version         1.1.0
//
// @history         1.1.0 visto che ci sono un po' di cose mettiamo le opzioni
// @history         1.0.0 nasce ikaDBase
//
// @include         http://s*.ikariam.*/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require         http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js
// @require         https://raw.github.com/andris9/jStorage/master/jstorage.js
// ==/UserScript==

ikaD = {
  versione: "1.1.0",

  iDS      : {},
  iIkariam : {},
  iScreen  : {},

  dsOpzioni: {},
  dsCitta  : {},
  dsEdifici: {},
  dsRisorse: {},

  init: function() {

    ikaD.dsOpzioni = $.jStorage.get("ikaD.dsOpzioni", {});
    ikaD.dsCitta   = $.jStorage.get("ikaD.dsCitta"  , {});
    ikaD.dsEdifici = $.jStorage.get("ikaD.dsEdifici", {});
    ikaD.dsRisorse = $.jStorage.get("ikaD.dsRisorse", {});

    ikaD.setClassi();

    ikaD.iDS      = unsafeWindow.dataSetForView;
    ikaD.iIkariam = unsafeWindow.ikariam;
    ikaD.iScreen  = unsafeWindow.ikariam.getScreen().data;

    //prendo i dati delle citta
    ikaD.dsetCitta();

    //se sono nella mia città, prendo i dati dalla videata
    if (ikaD.iDS.backgroundView == 'city' && ikaD.iDS.isOwnCity)  {
      ikaD.dsetCittaAttuale();
      ikaD.dsetRisorse();
      ikaD.dsetEdifici();
    }

    ikaD.opzioni.scriviVoceMenu();

    $.jStorage.deleteKey("ikaD.dsCitta");
    $.jStorage.deleteKey("ikaD.dsRisorse");
    $.jStorage.deleteKey("ikaD.dsEdifici");
    $.jStorage.set("ikaD.dsCitta", ikaD.dsCitta);
    $.jStorage.set("ikaD.dsRisorse", ikaD.dsRisorse);
    $.jStorage.set("ikaD.dsEdifici", ikaD.dsEdifici);

  },

  //estrazione dati dal web
  dsetCitta: function() {
    var citta = {};
    citta.idCittaAttuale = ikaD.dsCitta.idCittaAttuale;
    $.each(ikaD.iDS.relatedCityData, function(k, v) {
      if ((k.indexOf("city_", 0) >= 0) && (v.relationship == "ownCity")) {
        if (ikaD.dsCitta[v.id] == undefined){
          //aggiungo le città nuove
          var xy = v.coords.match(/\[(\d+):(\d+)\]/);
          var c = {
            id      : v.id,
            nome    : v.name,
            iRisorsa: Math.floor(v.tradegood),
            vinoCons: 0,
            vinoRisp: 0,
            xyX     : Math.floor(xy[1]),
            xyY     : Math.floor(xy[2])
          };
        } else {
          c = ikaD.dsCitta[v.id];
        }
        citta[v.id] = c;
      }
    } );
    ikaD.dsCitta = citta;
  },
  dsetCittaAttuale: function() {
    var id = ikaD.iScreen.id;
    ikaD.dsCitta.idCittaAttuale = id;
    ikaD.dsCitta[id].islandId   = ikaD.iScreen.islandId;
    ikaD.dsCitta[id].vinoCons   = Math.floor(ikaD.iDS.wineSpendings);
  },
  dsetEdifici: function() {
    var edifici = new Array();
    var nPorto, nMagazzino , lCantina = 0;
    $.each(ikaD.iScreen.position, function(k, v) {

      if (v.completed == undefined) {
        var n=v.building;
      } else {
        var n=v.building.split(" ")[0];
      }
      switch (n) {
        case "port":
          if (nPorto == 0) {
            nPorto = 1;
          } else {
            n = n + "2";
            nPorto = 2;
          }
          break;
        case "warehouse":
          if (nMagazzino == 0) {
            nMagazzino = 1;
          } else if (nMagazzino == 1) {
            n = n + "2";
            nMagazzino = 2;
          } else if (nMagazzino == 2) {
            n = n + "3";
            nMagazzino = 3;
          } else {
            n = n + "4";
            nMagazzino = 4;
          }
          break;
        case "vineyard":
          lCantina = Math.floor(v.level);
          break;
        case "buildingGround land":
          n = false;
          break;
        case "buildingGround wall":
          n = false;
          break;
        default:
          break;
      }
      if (n) {
        var e = {
          nome    : v.name,
          edificio: n,
          livello : Math.floor(v.level),
          position: k,
          inUp    : v.completed != undefined,
          tempoUp : v.completed == undefined ? false : v.completed,
          maxUp   : (ikaD.elEdifici[n].lMax > 0 && Math.floor(v.level) >= ikaD.elEdifici[n].lMax)
        };
        if (e.inUp) e.livello++;

        edifici.push(e);
      }
    } );
    ikaD.dsEdifici[ikaD.dsCitta.idCittaAttuale] = edifici;
    //imposto il risparmio del consumo di vino nella citta attuale
    ikaD.dsCitta[ikaD.dsCitta.idCittaAttuale].vinoRisp = lCantina/100;
  },
  dsetRisorse: function() {
    var r = ikaD.iDS.currentResources;
    var risorse = {
      possedute: {
        legno    : Math.floor(r.resource),
        vino     : Math.floor(r[1]),
        marmo    : Math.floor(r[2]),
        cristallo: Math.floor(r[3]),
        zolfo    : Math.floor(r[4])
      },
      prodotte: {
        legno    : ikaD.setRisorsaSpeciale(0, 0,ikaD.iDS.resourceProduction),
        vino     : ikaD.setRisorsaSpeciale(1, ikaD.iDS.producedTradegood, ikaD.iDS.tradegoodProduction),
        marmo    : ikaD.setRisorsaSpeciale(2, ikaD.iDS.producedTradegood, ikaD.iDS.tradegoodProduction),
        cristallo: ikaD.setRisorsaSpeciale(3, ikaD.iDS.producedTradegood, ikaD.iDS.tradegoodProduction),
        zolfo    : ikaD.setRisorsaSpeciale(4, ikaD.iDS.producedTradegood, ikaD.iDS.tradegoodProduction)
      },
      abitanti: {
        totali: Math.floor(r.population),
        liberi: Math.floor(r.citizens)
      }
    };

    ikaD.dsRisorse[ikaD.dsCitta.idCittaAttuale] = risorse;
  },

  //set Dati
  setRisorsaSpeciale: function(i,iR,v) {
    return Math.floor(i) == Math.floor(iR) ? Math.floor(v * 3600) : 0;
  },
  setClassi : function() {
    $.each(ikaD.cssClassi, function(k, v) {
      $('head').append('<style type="text/css">.' + k + v + '</style>'
        );
    });
  },

  //get Dati
  getCittaAttuale: function() {
    return ikaD.getCittaById(ikaD.dsCitta.idCittaAttuale);
  },
  getCittaById   : function(id) {
    var c = ikaD.dsCitta[id];
    return c ? c : false;
  },
  getXYCittaById : function(id) {
    var c = ikaD.getCittaById(id);
    return c ? c.xyX + ":" + c.xyY : "";
  },
  vinoConsTot: function(id) {
    var c = ikaD.getCittaById(id);
    return c.vinoCons * (1-c.vinoRisp);
  },

  //funzioni varie di formattazione
  formattaGiornoDaS: function(s) {
    var g = s >= (3600 * 24) ? Math.floor(s / (3600 * 24)) : 0;

    s -= g * (3600 * 24);
    var o = s >= 3600 ? Math.floor(s / 3600) : 0;

    s -= o * 3600;
    var m = s >= 60 ? Math.floor(s / 60) : 0;
    m = m < 10 ? '0' + m.toString() : m;

    s -= m * 60;
    s = s < 10 ? '0' + s.toString() : s;

    var tOut = m + ':' + s;
    tOut = o > 0 ? o + ':' + tOut : tOut;
    tOut = (g > 0) ? g + "g " + tOut : tOut;
    return tOut;
  },
  formattaNumero   : function(n) {
    return ikaD.iIkariam.numberFormat(Math.floor(n), 0, ',', '.');
  },
  // Funzioni di disegno
  disegnaTabella: function(t, d, p, m) {

    //Scrivo la riga dei titoli
    var tHtmlTitoli = "<tr class=\'clTRiga\'>";
    for (var j = 0; j < t[0].length; j++) {
      tHtmlTitoli += "<td class=\'clTCella clCella\' "+
      "colspan=\'" + t[0][j].cSpan + "\'>" + t[0][j].v + "</td>";
    }
    tHtmlTitoli += "</tr>";

    //Scrivo i dati della tabella
    var tHtml = ""; //testo della tabella
    var wTab  = 0;  //larghezza totale della tabella
    //scorro le righe
    for (var i = 1; i < t.length; i++) {
      tHtml += "<tr class=\'" + (t[i].stileRiga == undefined ? "" : "clTRiga") + "\'>";
      //scorro le colonne
      for (j = 0; j < t[i].length; j++) {
        //Stile della cella
        wTab+=i==1?t[i][j].w:0;
        var sApp="";
        sApp += t[i][j].b ? " style=\'font-weight:bold;\'" : "";
        sApp += t[i][j].w ? " width=\'" + t[i][j].w + "px\'" : "";
        sApp += t[i][j].a ? " align=\'" + t[i][j].a + "\'" : "";
        sApp += t[i][j].t ? " title=\'" + t[i][j].t + "\' alt=\'" + t[i][j].t + "\'" : "";
        //Classi aggiuntive
        var cS = t[i][j].c ? " " + t[i][j].c + " " : "";
        //Scrivo la cella
        tHtml += "<td class=\'" + cS + "clCella" + "\' "  + sApp + ">" + t[i][j].v + "</td>";
      }
      //chiudo la riga
      tHtml += "</tr>";
    }

    //appendo id div ["id"+d] con la tabella [tHtmlTitoli + tHtml] all'oggetto [p] ricevuto in input
    $('#header').append(
      "<div id='id" + d + "' class=\'clDiv\'>" + "<table class=\'clTab\'>"
      + tHtmlTitoli + tHtml + "</table></div>");
    //applico gli stili al div
    $("#id" + d).width(wTab);
    $("#id" + d).css("top", 100);
    $("#id" + d).css("left", 50);


    //creo l'evento over/out all'oggetto padre
    $("#id" + d).hover(false, function() {
      $('#id' + d).delay(100).fadeOut();
    });
    $(p).hover(function() {
      $('#id' + d).delay(100).fadeIn();
    });
  }
};

/*
* opzioni
*/
ikaD.opzioni = {};
//questo lo richiamo da tutti i vari script
//ogni script aggiunge le sue opzioni con il valore di default
//se esiste già lascio quello che c'è altrimenti metto il default
ikaD.opzioni.settaValore = function(o,v) {
  if (ikaD.dsOpzioni[o]==undefined)
    ikaD.dsOpzioni[o]=v;
};
//qui scriviamo il div
ikaD.opzioni.scriviTabella = function () {

  if ($('#ikaDOpzioni').length == 0) {
    //creo la tabella delle opzioni
    var t = '<table class=clTab>';
    t += '<tr class=clTRiga><td class=clTCella align=center colspan=2>Opzioni IkaD</td></tr>';

    //opzioni
    $.each(ikaD.dsOpzioni, function (k,v) {
      if (k!='') {
        t += '<tr><td width=\'30px\' class=\'clCella\' align=\'center\'>';
        t += '<input title=\''+k+'\' type=\'checkbox\' value=\''+k+'\' '+(v?'checked':'unchecked')+' \>';
        t += '</td><td class=\'clCella\'>' + k + '</td>';
      }
    });

    //bottoni
    t += '<tr class=clTRiga height=30px><td class=clTCella align=center colspan=2>' +
    '<input type=button value=salva  id=ikaDOpzioniSalva  class=clOpzBSalva>' +
    '&nbsp;&nbsp;&nbsp;' +
    '<input type=button value=chiudi id=ikaDOpzioniChiudi class=clOpzBChiudi>' +
    '</td></tr>';

    t += "</table>";

    //aggiungo la tabella
    var sDiv = 'width:150px;left:40px;top:-120px;';
    $('#advisors').append('<div id=ikaDOpzioni class=clDiv style=\'' + sDiv + '\'>' + t + '</div>');

    //aggiungo l'evento per salvare i dati
    $("#ikaDOpzioniSalva").click(function(event){
      ikaD.dsOpzioni = {};
      $.each($("#ikaDOpzioni :input[type=checkbox]"), function (k,v) {
        ikaD.dsOpzioni[v.title] = v.checked;
      });
      $.jStorage.deleteKey("ikaD.dsOpzioni");
      $.jStorage.set("ikaD.dsOpzioni", ikaD.dsOpzioni);
    });

    //aggiungo l'evento per chiudere la finestra
    $("#ikaDOpzioniChiudi").click(function(event){
      $('#ikaDOpzioni').delay(30).fadeOut();
    });
  }
};
//voce di menu per aprire la tabella delle opzioni
ikaD.opzioni.scriviVoceMenu = function () {
  //aggiungo la scritta in alto per aprire il menu
  $('#GF_toolbar >ul').append('<li><a id=ikaDOpzioniVoceMenu href=\'javascript:\' title=\'Opzioni IkaD\'>Opzioni Ikad</a></li>');
  $("#ikaDOpzioniVoceMenu").click(function(event){
    if($('#ikaDOpzioni').length == 0)
      ikaD.opzioni.scriviTabella();
    $('#ikaDOpzioni').delay(100).fadeIn();
  });
};

/*
* Variabili ed elenchi utili
*/
ikaD.elEdifici = {
  townHall: {
    i: 1,
    nIta: 'Municipio',
    nAbb: 'Mun',
    lMax: 40
  },
  wall: {
    i: 2,
    nIta: 'Mura della città',
    nAbb: 'Mur',
    lMax: 40
  },
  safehouse: {
    i: 3,
    nIta: 'Nascondiglio',
    nAbb: 'Nasc',
    lMax: 32
  },
  tavern: {
    i: 4,
    nIta: 'Taverna',
    nAbb: 'Tav',
    lMax: 0
  },
  museum: {
    i: 5,
    nIta: 'Museo',
    nAbb: 'Mus',
    lMax: 0
  },
  palace: {
    i: 6,
    nIta: 'Palazzo',
    nAbb: 'Pal',
    lMax: 11
  },
  palaceColony: {
    i: 7,
    nIta: 'Residenza del Governatore',
    nAbb: 'Res',
    lMax: 11
  },
  port: {
    i: 8,
    nIta: 'Porto',
    nAbb: 'P1',
    lMax: 0
  },
  port2: {
    i: 9,
    nIta: 'Porto2',
    nAbb: 'P2',
    lMax: 0
  },
  carpentering: {
    i: 10,
    nIta: 'Carpenteria',
    nAbb: '-L',
    lMax: 32
  },
  architect: {
    i: 11,
    nIta: 'Ufficio dell`Architetto',
    nAbb: '-M',
    lMax: 32
  },
  vineyard: {
    i: 12,
    nIta: 'Cantine',
    nAbb: '-V',
    lMax: 32
  },
  optician: {
    i: 13,
    nIta: 'Ottico',
    nAbb: '-C',
    lMax: 32
  },
  fireworker: {
    i: 14,
    nIta: 'Zona Pirotecnica',
    nAbb: '-Z',
    lMax: 32
  },
  forester: {
    i: 15,
    nIta: 'Casa del Guardia Boschi',
    nAbb: '+L',
    lMax: 32
  },
  stonemason: {
    i: 16,
    nIta: 'Tagliapietra',
    nAbb: '+M',
    lMax: 32
  },
  winegrower: {
    i: 17,
    nIta: 'Viticoltore',
    nAbb: '+V',
    lMax: 32
  },
  glassblowing: {
    i: 18,
    nIta: 'Vetraio',
    nAbb: '+C',
    lMax: 32
  },
  alchemist: {
    i: 19,
    nIta: 'Torre dell`Alchimista',
    nAbb: '+Z',
    lMax: 32
  },
  barracks: {
    i: 20,
    nIta: 'Caserma',
    nAbb: 'Cas',
    lMax: 0
  },
  shipyard: {
    i: 21,
    nIta: 'Cantiere Navale',
    nAbb: 'Cant',
    lMax: 0
  },
  dump: {
    i: 22,
    nIta: 'Deposito',
    nAbb: 'Dep',
    lMax: 0
  },
  warehouse: {
    i: 23,
    nIta: 'Magazzino',
    nAbb: 'M1',
    lMax: 40
  },
  warehouse2: {
    i: 24,
    nIta: 'Magazzino2',
    nAbb: 'M2',
    lMax: 40
  },
  warehouse3: {
    i: 25,
    nIta: 'Magazzino3',
    nAbb: 'M3',
    lMax: 40
  },
  warehouse4: {
    i: 26,
    nIta: 'Magazzino4',
    nAbb: 'M4',
    lMax: 40
  },
  academy: {
    i: 27,
    nIta: 'Accademia',
    nAbb: 'Acc',
    lMax: 0
  },
  embassy: {
    i: 28,
    nIta: 'Ambasciata',
    nAbb: 'Amb',
    lMax: 0
  },
  branchOffice: {
    i: 29,
    nIta: 'Mercato',
    nAbb: 'Mer',
    lMax: 0
  },
  temple: {
    i   : 30,
    nIta: 'Tempio',
    nAbb: 'Tem',
    lMax: 0
  },
  workshop: {
    i   : 31,
    nIta: 'Officina',
    nAbb: 'Off',
    lMax: 28
  }
};

ikaD.elRisorse = {
  legno: {
    iR : 1,
    iRS: false
  },
  vino: {
    iR : 3,
    iRS: 1
  },
  marmo: {
    iR : 2,
    iRS: 2
  },
  cristallo: {
    iR : 4,
    iRS: 3
  },
  zolfo: {
    iR : 5,
    iRS: 4
  },
  abitanti: {
    iR : false,
    iRS: false
  },
  oro: {
    iR : false,
    iRS: false
  },
  rProdotta: {
    iR : false,
    iRS: false
  },
  rTotali: {
    iR : false,
    iRS: false
  }
};

ikaD.elNavi = {
  "Nave mercantile"         :{
    nAbb:'Nave mercantile',
    v: 60,
    img:'/skin/characters/fleet/60x60/ship_trans_prem_r_60x60.pngj'
  },
  "Spie"                    :{
    nAbb:'Spie'           ,
    v:240,
    img:'/skin/characters/military/120x100/spy_120x100.gif'
  },
  "Nave lanciafiamme"       :{
    nAbb:'Lanciafiamme'   ,
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_flamethrower_faceright.gif'
  },
  "Ariete a vapore"         :{
    nAbb:'Ariete a vapore',
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_steamboat_faceright.gif'
  },
  "Nave con Ariete"         :{
    nAbb:'Ariete'         ,
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_ram_faceright.gif'
  },
  "Nave con Catapulta"      :{
    nAbb:'Catapulta'      ,
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_catapult_faceright.gif'
  },
  "Nave con Balestra"       :{
    nAbb:'Balestra'       ,
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_ballista_faceright.gif'
  },
  "Nave con Mortaio"        :{
    nAbb:'Mortaio'        ,
    v: 30,
    img:'/skin/characters/fleet/60x60/ship_mortar_faceright.gif'
  },
  "Nave lanciamissili"      :{
    nAbb:'Lanciamissili'  ,
    v: 30,
    img:'/skin/characters/fleet/60x60/ship_rocketship_faceright.gif'
  },
  "Sottomarino"             :{
    nAbb:'Sottomarino'    ,
    v: 40,
    img:'/skin/characters/fleet/60x60/ship_submarine_faceright.gif'
  },
  "Ariete con ruote a pale" :{
    nAbb:'Paddle'         ,
    v: 60,
    img:'/skin/characters/fleet/60x60/ship_paddlespeedship_faceright.gif'
  },
  "Portapalloni"            :{
    nAbb:'Portapalloni'   ,
    v: 20,
    img:'/skin/characters/fleet/60x60/ship_ballooncarrier_faceright.gif'
  },
  "Nave appoggio"           :{
    nAbb:'Nave appoggio'  ,
    v: 30,
    img:'/skin/characters/fleet/60x60/ship_tender_faceright.gif'
  }
};

ikaD.elIcone = {
  legno     : '/skin/resources/icon_wood.png',
  vino      : '/skin/resources/icon_wine.png',
  marmo     : '/skin/resources/icon_marble.png',
  cristallo : '/skin/resources/icon_glass.png',
  zolfo     : '/skin/resources/icon_sulfur.png',
  abitanti  : '/skin/resources/icon_population.png',
  oro       : '/skin/minimized/finances.png',
  rProdotta : '/skin/layout/icon-island.png',
  rTotali   : '/skin/layout/icon-city2.gif',
  r0C       : '/skin/img/island/holz_abbau_leer.png',
  r1C       : '/skin/img/island/weinanbau_auf_der_insel_leer.png',
  r2C       : '/skin/img/island/stein_abbau_leer.png',
  r3C       : '/skin/img/island/kristall_auf_der_insel_leer_neu.png',
  r4C       : '/skin/img/island/schwefel_auf_der_insel_leer_neu.png',
  isola     : '/skin/layout/icon-island.png'
};

ikaD.cssColori = {
  coDef        : '906646',//marrone scuro testo
  coDefChiaro  : 'faeac6',//marrone chiaro
  coDefScuro   : 'db9a48',//marrone scuro
  coOEdMaxUp   : '0303aa',//blu scuro
  coEdInUp     : '0d6800',//verde scuro
  coEdMaxUpS   : 'b7d4db',//blu chiaro
  coEdInUpS    : '7dd485',//verde chiaro
  coRProd      : '0d6800',//verde scuro
  coRProd0     : '906646',//'faeac6',//marrone chiaro
  coRVinoS12   : 'aa0303',//rosso scuro
  coRVinoS24   : 'f6a50a',//giallo scuro
  coRVino      : 'aa0303',//rosso scuro
  coOpzBChiudiS: 'aa0303',//rosso scuro
  coOpzBSalvaS : '7dd485' //verde chiaro
};

ikaD.cssClassi = {
  clDiv           :'{font:11px Arial,Helvetica,sans-serif; color:#' + ikaD.cssColori.coDef + '; display:none; position:relative; z-index:1000000;}',
  clTab           :'{padding: 2px;width:100%;border-collapse:collapse;background:-webkit-gradient(linear, left top, right bottom, from(#fadfab), to(#'+ikaD.cssColori.coDefChiaro+')); background: -moz-linear-gradient(left top, #fadfab, #'+ikaD.cssColori.coDefChiaro+');}',
  clTRiga         :'{background: -webkit-gradient(linear, left bottom, left top, from(#'+ikaD.cssColori.coDefScuro+'), to(#'+ikaD.cssColori.coDefChiaro+')); background: -moz-linear-gradient(bottom, #'+ikaD.cssColori.coDefScuro+', #'+ikaD.cssColori.coDefChiaro+');}',
  clTCella        :'{font-weight:bold; text-align:center;}',
  clCella         :'{padding: 2px;border:thin solid #' + ikaD.cssColori.coDef + ';}',
  clProdFont      :'{font-size:80%;}',
  clProdColor     :'{color:#' + ikaD.cssColori.coRProd  + ';}',
  clProdColor0    :'{opacity:0.4;}',
  clProdColorVino :'{color:#' + ikaD.cssColori.coRVino  + ';}',
  clEdMaxUpS      :'{background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coEdMaxUpS+')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coEdMaxUpS+');color:#' + ikaD.cssColori.coEdMaxUp + ';}',
  clEdInUpS       :'{background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coEdInUpS+')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coEdInUpS+');color:#' + ikaD.cssColori.coEdInUp + ';}',
  clVinoDeficit12 :'{background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coRVinoS12+')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coRVinoS12+');}',
  clVinoDeficit24 :'{background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coRVinoS24+')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coRVinoS24+');}',
  clOpzBChiudi    :'{padding:2px;width:50px;background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coOpzBChiudiS+')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coOpzBChiudiS+');color:#' + ikaD.cssColori.coDef + ';}',
  clOpzBSalva     :'{padding:2px;width:50px;background:-webkit-gradient(linear, left top, right bottom, from(#'+ikaD.cssColori.coDefChiaro+'), to(#'+ikaD.cssColori.coOpzBSalvaS +')); background: -moz-linear-gradient(left top,#'+ikaD.cssColori.coDefChiaro+',#'+ikaD.cssColori.coOpzBSalvaS +');color:#' + ikaD.cssColori.coDef + ';}'
};

$(document).ready(function() {
  ikaD.init();
  console.log(ikaD);
});
