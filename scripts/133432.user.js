// ==UserScript==
// @name        ikaDPallini
// @namespace   ikaD
// @description un po' di informazioni nella città, grazie
// @author      ettoresiniscalchi
// @version     1.0.0
// @copyright   2012+, ettoresiniscalchiForPresident
//
// @history   1.0.0 nuovo nuovo
//
// @include     http://s*.ikariam.*/*

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js
// @require     https://raw.github.com/andris9/jStorage/master/jstorage.js
// @require     http://userscripts.org/scripts/source/132770.user.js
// ==/UserScript==

ikaD.vediPalliniEdifici = function() {
  if (ikaD.iDS.backgroundView=='city' && ikaD.iScreen.id ==ikaD.dsCitta.idCittaAttuale) {
    e = ikaD.dsEdifici[ikaD.dsCitta.idCittaAttuale];
    var sDiv = 'position:relative;top:20px;z-index:1000000;opacity:0.7;' +
    'border:#'+ikaD.cssColori.coDef+';border-width:2px;border-style:solid;border-radius:10px 13px;box-shadow:3px 3px 5px #888888;';
    var sCella='color:#'+ikaD.cssColori.coDef+';font:12px Arial,Helvetica,sans-serif;' +
    'text-align:center;vertical-align:middle;font-weight:bold;';
    $.each(e, function(k, p) {
      var sColoreBack = ikaD.cssColori.coDefChiaro;
      if (p.inUp) {
        sColoreBack=ikaD.cssColori.coEdInUpS
        } else if (p.maxUp) {
        sColoreBack=ikaD.cssColori.coEdMaxUpS
        }
      var sBG = 'background-color:#'+sColoreBack;

      var t = '<div style=\'' + sDiv + sBG + '\'><table width=100% height=100%><tr><td style=\''+sCella+'\'>' +
      p.nome + '<br>' + p.livello +
      '</td></tr></table></div>';

      $("#position"+p.position).prepend(t);
    });
  }
};

$(document).ready(function() {
  ikaD.opzioni.settaValore('vediPallini', true);
  if (ikaD.dsOpzioni.vediPallini)
    ikaD.vediPalliniEdifici();
});
