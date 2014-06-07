// ==UserScript==
// @name           Notizen Button Alle Pennergames
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Erstellt ein Notizen Button wo man immer Sachen reinschreiben kann
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @include        http://*pennergame.de*
// @exclude		*board*
// ==/UserScript==

// Farbeinstellungen
var position = 'fixed';
var top = GM_getValue('top');
if(top == null){
GM_setValue('top', 50);
var top = GM_getValue('top');
}
//var bottom = '50';
//var right = '50';
var left = GM_getValue('left');
if(left == null){
GM_setValue('left', 50);
var left = GM_getValue('left');
}
if(GM_getValue('rows') == null){
GM_setValue('rows', 10);
}
if(GM_getValue('rows') == null){
GM_setValue('rows', 10);
}
if(GM_getValue('inhalt') == null){
GM_setValue('inhalt', 'Pennergame Notizen by Boggler');
}
var fontsize = 'x-small';
var radius = '20';
var sichtbar = '';
var border = '1px solid #000000';
var bgcolor = '#313131';



var footer = document.getElementById('footer');
footer.innerHTML += '<span id="notizen" style="position:'+position+';top:'+top+'px;left:'+left+'px;font-size:'+fontsize+';-moz-border-radius:'+radius+'px;-moz-opacity:'+sichtbar+';border:'+border+'; background-color:'+bgcolor+'"></span>';


document.getElementById('notizen').innerHTML = '<center><a target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"C by Boggler Pennerhack\"><span style=\"color:white\"><b>Pennergame Notizen by Boggler</b></span></a></center><br>'
+'<center><textarea id="inhalt" cols="'+GM_getValue('cols')+'"rows="'+GM_getValue('rows')+'">'+GM_getValue('inhalt')+'</textarea><br>'
+'Left(px): <input type="text" id="left" size="2" value="'+GM_getValue('left')+'" />   Top:(px): <input type="text" id="top" size="2" value="'+GM_getValue('top')+'" />   Rows: <input type="text" id="rows" size="2" value="'+GM_getValue('rows')+'" />   Rows: <input type="text" id="cols" size="2" value="'+GM_getValue('cols')+'" /><br>'
+'<input type="button" id="speichern" value="Speichern" /></center>';



document.getElementById('speichern').addEventListener('click', function speichern() {
GM_setValue('inhalt', document.getElementById('inhalt').value);
GM_setValue('left', document.getElementById('left').value);
GM_setValue('top', document.getElementById('top').value);
GM_setValue('rows', document.getElementById('rows').value);
GM_setValue('cols', document.getElementById('cols').value);
location.reload()
},false);


// Copyright (c) by Boggler @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.
