// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Auswahl fuer Mapgroesse
// @description   Fügt der PHP-Map eine Auswahl hinzu die ein schnelles wechseln der Mapgröße ermöglicht
// @exclude       http://game1.andaloria*/*
// @exclude       http://phpmap1.andaloria*/field.php
// @include       http://phpmap1.andaloria*/map.php*
// @include       http://phpmap1.andaloria*/profile.php
// ==/UserScript==

// nach der wert übergabe der mapgröße, seite weiterleiten zur map



// erstellt Auswahlfeld

var gm_topLineHeight4 = '0em';
var gm_topLineColor4 = '#000';

var gm_topLineFontSize4 = 'small';
var gm_topLineTextAlign4 = 'left';

var gm_topLineStyle4 = 'style="'+
                'height :' + gm_topLineHeight4 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor4 + ';"'

var gm_topLineInnerStyle4 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: absolute; left:710px; top:5px; ' +
                'width: 175px; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight4 +
                'border-bottom: 1px solid #000000; ' +
                'font-size: ' + gm_topLineFontSize4 + '; ' +
                'text-align: ' + gm_topLineTextAlign4 + ';' +
                'color: '+ gm_topLineColor4 + ';"'

var gm_topLine4 = document.createElement("div");
gm_topLine4.setAttribute('id', 'myGM_topLine4');

gm_topLine4.innerHTML = '<div '+ gm_topLineStyle4 + '>' +
        '<div ' + gm_topLineInnerStyle4 + '>' +


'<table background="http://phpmap1.andaloria.de/img/images/kachel_oben.jpg" style="background-color:#2C2C40;border:thin solid black;padding:0.5px;" align="left"><tr><td>' +
'<form id="mapsize" action="profile.php" method="post">' +
'<input type="hidden" name="action" value="save">' +
'X <select name="sx">' +
'<option value="' +
// Groeßeneinstellung fuer X Koordinate
// L
'1500' +
'">L</option>' +
'<option value="' +
// M
'800' +
'">M</option>' +
'<option value="' +
// S
'600' +
'">S</option>' +
'</select>Y <select name="sy">' +
'<option value="' +
// Groeßeneinstellung fuer Y Koordinate
// L
'1000' +
'">L</option>' +
'<option value="' +
// M
'600' +
'">M</option>' +
'<option value="' +
// S
'400' +
'">S</option>' +
'</select>' +
'<input type="hidden" id="fog" name="fog" value="1">' +
"<a class=\"menu navigation\" href=\"javascript:document.getElementById('mapsize').submit()\">ok</a></form></td></tr></table>" +
'</div></div>';

document.body.insertBefore(gm_topLine4, document.body.firstChild);


//weiterleitung zur map nachdem die daten geändert wurden 
if (window.location.href.indexOf("http://phpmap1.andaloria.de/profile.php") >= 0){
window.location.href = 'http://phpmap1.andaloria.de/map.php';
}
