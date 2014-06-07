// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PHP-Map manuelle Koordinateneingabe
// @description   Start/Stop Koordinaten Eingabefeld
// @exclude       http://game1.andaloria*/*
// @exclude       http://phpmap1.andaloria*/field.php
// @include       http://phpmap1.andaloria*/map.php*
// @include       http://phpmap1.andaloria*/profile.php

// ==/UserScript==



function addGlobalScript(javascript) {
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('script');
	style.type = 'text/Javascript';
	style.innerHTML = javascript;
	head.appendChild(style);
}



// mapposition lesen

addGlobalScript('window.onload = function() { ' +
        'var formul = document.getElementById("naviform"); ' +
	'var mx = formul.elements[0].value; ' +
	'var my = formul.elements[1].value; ' +
	'var waybox = document.getElementById("waybox"); ' +
        'waybox.x.value = mx; ' +
        'waybox.y.value = my; ' +
        '} ');

addGlobalScript('var formul = document.getElementById("naviform"); ' +
	'var mx = formul.elements[0].value; ' +
	'var my = formul.elements[1].value; ' +
	'var waybox = document.getElementById("waybox"); ' +
        'waybox.x.value = mx; ' +
        'waybox.y.value = my; ');


/*
 nach manueller koordeingabe
 zentriert die map zwischen start und stop position.
 ermöglicht größere pfade und das ausgeben eines pfades
 auch wenn die start oder stop koordinaten zuvor nicht auf der karte angezeigt wurden.
*/

addGlobalScript('function mittelwert() { ' +
	'var waybox = document.getElementById("waybox"); ' +
        'mxs = waybox.xs.value; ' +
        'mys = waybox.ys.value; ' +
        'mxe = waybox.xe.value; ' +
        'mye = waybox.ye.value; ' +
        'mx1 = parseInt(mxs) + parseInt(mxe); ' +
        'my1 = parseInt(mys) + parseInt(mye); ' +
        'mx2 = parseInt(mx1) / 2; ' +
        'my2 = parseInt(my1) / 2; ' +
        'waybox.x.value= parseInt(mx2); ' +
        'waybox.y.value= parseInt(my2); ' +
	'} ');



// Koordinaten der aktuellen Position an Start oder Stop übergeben

addGlobalScript('function setStart99() { ' +
	'var waybox = document.getElementById("waybox"); ' +
        'waybox.xs.value= mx; ' +
        'waybox.ys.value= my; ' +
	'} ');

addGlobalScript('function setEnd99() { ' +
	'var waybox = document.getElementById("waybox"); ' +
        'waybox.xe.value= mx; ' +
        'waybox.ye.value= my; ' +
	'} ');



// Koordinaten Eingabefeld erstellen

var gm_topLineHeight = '0em';
var gm_topLineColor = '#fff';

var gm_topLineFontSize = 'small';
var gm_topLineTextAlign = 'left';

var gm_topLineStyle = 'style="'+
                'height :' + gm_topLineHeight + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor + ';"'

var gm_topLineInnerStyle = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: absolute; top:45px; left:735px; ' +
                'width: 275px; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 5px; ' +
                'font-size: ' + gm_topLineFontSize + '; ' +
                'text-align: ' + gm_topLineTextAlign + ';' +
                'color: '+ gm_topLineColor + ';"'

var gm_topLine = document.createElement("div");
gm_topLine.setAttribute('id', 'myGM_topLine');

gm_topLine.innerHTML = '<div '+ gm_topLineStyle + '>' +
        '<div ' + gm_topLineInnerStyle + '>' +



"<table background='http://phpmap1.andaloria.de/img/images/kachel_oben.jpg' style=\'background-color:#2C2C40;border:thin solid black;padding:0.5px;\' align=\'left\'><tr><td><form id=\'waybox\' action=\'map.php\'>  <input type=\"hidden\" name=\"waytext\" value=\"\" />" +
"<input type=\"hidden\" name=\"x\" value=\"\" />" +
"<input type=\"hidden\" name=\"y\" value=\"\" />" +
" <a href=\"javascript:setStart99()\"><img src='http://marsh-mellow.de/anda/start.png'></a> <input class=\'text\' type=\'text\' name=\'xs\' value=\'\' size=\'2\' maxlength=\'4\' /><input class=\'text\' type=\'text\' name=\'ys\' value=\'\' size=\'2\' maxlength=\'4\' /> " +
" <a href=\"javascript:setEnd99()\"><img src='http://marsh-mellow.de/anda/stop.png'></a> <input class=\'text\' type=\'text\' name=\'xe\' value=\'\' size=\'2\' maxlength=\'4\' /><input class=\'text\' type=\'text\' name=\'ye\' value=\'\' size=\'2\' maxlength=\'4\' /> " +
"<input type=\'hidden\' name=\'use_street\' value=\'1\'> <a class='menu navigation' href=\"javascript:mittelwert();javascript:document.getElementById('waybox').submit()\" >Go</a></form></td></tr>" +
"</table>" +

        '</div></div>';

document.body.insertBefore(gm_topLine, document.body.firstChild);  
