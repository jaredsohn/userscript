// ==UserScript==
// @name        IkaDDistCalc
// @namespace   IkaD
// @description calcoliamo le distanze
// @author      ettoresiniscalchi
// @version     1.0.0
// @copyright   2012+, ettoresiniscalchiForPresident
//
// @history 1.0.0 ciccia
//
// @include http://s*.ikariam.*/*
//
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js
// @require https://raw.github.com/andris9/jStorage/master/jstorage.js
//
// ==/UserScript==

/**
* getDistanceCalc
*
*/

ikaD.DC = {};
ikaD.DC.prendiDati = function() {

  var c = ikaD.getCittaAttuale();
  var cX1 = c.xyX;
  var cY1 = c.xyY;

  var nomeIsola = ""; //nome dell'isola
  var cX2 = 0;
  var cY2 = 0;

  switch (ikaD.iDS.backgroundView) {
    case 'city':
      if (ikaD.iDS.isOwnCity) {
        nomeIsola = ikaD.iScreen.islandName;
        cX2       = Math.floor(ikaD.iScreen.islandXCoord);
        cY2       = Math.floor(ikaD.iScreen.islandYCoord);
      } else {
        nomeIsola = 'di un altro';
        cX2       = 0;
        cY2       = 0;
      }
      break;

    case 'island':
      nomeIsola = ikaD.iScreen.name;
      cX2       = Math.floor(ikaD.iScreen.xCoord);
      cY2       = Math.floor(ikaD.iScreen.yCoord);
      break;
    case 'worldmap_iso':
      nomeIsola = 'mondo';
      cX2       = Math.floor(ikaD.iIkariam.getScreen().currMapX);
      cY2       = Math.floor(ikaD.iIkariam.getScreen().currMapY);
      break;
    default:
      nomeIsola = 'vediamo . ' + ikaD.iDS.backgroundView;
      cX2       = 0;
      cY2       = 0;
      break;
  }

  var d = 0; //distanza
  if (!(nomeIsola == "")) {
    d = Math.floor(20*3600*Math.sqrt(Math.pow(cX2-cX1, 2) + Math.pow(cY2-cY1, 2)));
  }
  var dc = {};
  dc.nomeIsola = nomeIsola;
  dc.cX1       = cX1;
  dc.cY1       = cY1;
  dc.cX2       = cX2;
  dc.cY2       = cY2;
  dc.d         = d;
  return dc;

};
ikaD.DC.vediDati = function(dc) {
  var navi = ikaD.elNavi;
  $('#idIkaDDC').remove();

  // Titoli
  var t = new Array();
  var i = 0;

  t[i] = new Array();
  t[i][0] = {
    v    : "navi",
    cSpan: 2
  };

  t[i][1] = {
    v    : dc.cX2+':'+dc.cY2,
    cSpan: 1
  };

  //Dati delle singole navi
  $.each(navi, function(k, n) {
    t[++i] = new Array();
    t[i][0] = {
      v: n.nAbb,
      w: 150,
      a: "center",
      b: true
    };
    t[i][1] = {
      v: '',//<img src=\'' + n.img + '\'>',
      w: 0,
      a: "center",
      b: false
    };

    //calcolo la distanza
    var distanza = dc.d;
    var velocita = n.v;
    var tempo=parseInt(distanza/velocita);

    t[i][2] = {
      v: ikaD.formattaGiornoDaS(tempo),
      w: 100,
      a: "right",
      b: false
    };

  } );

  ikaD.disegnaTabella(t, "DC", "#ikaDDCVoceMenu", -400);

}

//voce di menu per aprire la tabella delle opzioni
ikaD.DC.scriviVoceMenu = function () {
  //aggiungo la scritta in alto per aprire il menu
  $('#breadcrumbs').prepend('<a id=ikaDDCVoceMenu href=\'javascript:\' title=\'Calcolo delle distanze\'><img class=vertical_middle src=\'/skin/img/icon_target2.png\' /></a>');
  ikaD.DC.vediDati(ikaD.DC.prendiDati());
};

$(document).ready(function() {
  ikaD.DC.scriviVoceMenu();
});
