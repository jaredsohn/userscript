// myBar
// by psyched 07
//
// ==UserScript==
// @name           myBar
// @namespace      http://userscripts.org/users/33515;scripts
// @version        1.4
// @description    Veraendert die Infoleiste und den Header
// @include        http://forum.mods.de/bb/*
// @exclude        http://forum.mods.de/bb/pm/*
// ==/UserScript==


/*  Persoenliche Einstellungen
 *  false = nein
 *  true  = ja
 */

//====
var leiste = true;      //  Mods.de-Leiste ausblenden?
var fixed  = true;      //  InfoBar auch beim Scrollen anzeigen?
var infos  = true;      //  Zusaetzliche Infos anzeigen (Letzter Besuch, Link zur Suche)
var infos2 = true;      //  Dieselben Infos rechts oben ausblenden?
var drop   = false;     //  Dropdown-Boardauswahl ausblenden?
var size   = true;      //  Dropdown-Schrift vergroessern? (nur wenn drop=false)
var mods   = true;      // "Moderiert von:" - Leiste ausblenden?
var suche  = true;      //  Suche|Profil bearbeiten|Logout ausblenden?
//====


var td=document.getElementsByTagName('td');
for (var i=0; i<td.length; i++) {
  if (td[i].getAttribute('width')=='20%'  && td[i].getAttribute('vAlign')=='top') {
    if (td[i].innerHTML.match(/Letzter\sBesuch/gi)) {
      td[i].innerHTML.replace(/Letzter\sBesuch\:\s(.*)\sum\s(.*)\sUhr\./gi, '$1, $2');
      if (infos2) {
        td[i].style.display='none';
      }
    }
  }
  else if (mods && td[i].className=='color1') {
    td[i].style.display='none';
  }
}



if (document.getElementById('infobar')) {
  var infobar=document.getElementById('infobar1');
  if (fixed) {
    document.getElementById('infobar').style.position='fixed';
    document.getElementById('infobar').style.marginBottom='15px';
    if (document.getElementById('infobar_ext_buddies')) {
      document.getElementById('infobar_ext_buddies').style.position='fixed';
    }
    if (!drop) {
      if (document.getElementsByName('fswitch')) {
        document.getElementsByName('fswitch')[0].style.marginTop='15px';
      }
    }
  }
  if (infos) {
    var spacer=document.createTextNode(' | ');
    var suche=document.createElement('a');
        suche.href='search.php';
        suche.innerHTML='Suche';
    var date=document.createElement('span');
        date.style.marginLeft='20px';
        date.innerHTML='[Letzter Besuch: <b>'+RegExp.$1+'</b> um <b>'+RegExp.$2+'</b> Uhr ]';
    //var datum=document.createTextNode('[ Letzter Besuch: '+RegExp.$1+' ]');
    //date.appendChild(datum);
    infobar.appendChild(date);
    infobar.insertBefore(suche, infobar.childNodes[4]);
    infobar.insertBefore(spacer, suche);
  }
}


if (suche) {
  for (i=0; i<td.length; i++) {
    if (td[i].getAttribute('align')=='right' && td[i].innerHTML.match(/misc\.php\?action=logout/gi)) {
      //td[i].parentNode.removeChild(td[i]);
      td[i].style.display='none';
    }
  }
}

if (leiste) {
  if (document.getElementById('mdeleiste')) {
    document.getElementById('mdeleiste').parentNode.removeChild(document.getElementById('mdeleiste'));
  }
}

if (drop) {
  if (document.getElementsByName('fswitch').length) {
    document.getElementsByName('fswitch')[0].parentNode.removeChild(document.getElementsByName('fswitch')[0]);
  }
}
else if (!drop) {
  if (document.getElementsByName('fswitch').length) {
    GM_addStyle("option, select { font-size: 9pt; }");
  }
}