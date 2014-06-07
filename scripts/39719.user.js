// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mouse Koordinaten Anzeige
// @description   Fügt der PHP-Map eine Mouse Koordinatenanzeige in der linken unteren Ecke hinzu, um auch bei kleiner Auflösung und großer Mapgröße die Koordinaten sehen zu können
// @exclude       http://game1.andaloria*/*
// @exclude       http://phpmap1.andaloria*/field.php
// @include       http://phpmap1.andaloria*/map.php*
// ==/UserScript==


// Koordinatenanzeige

var gm_topLineHeight3 = '0em';
var gm_topLineColor3 = '#000';

var gm_topLineFontSize3 = 'small';
var gm_topLineTextAlign3 = 'left';

var gm_topLineStyle3 = 'style="'+
                'height :' + gm_topLineHeight3 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor3 + ';"'

var gm_topLineInnerStyle3 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: fixed; bottom:2px; left:2px; ' +
                'width: 150px; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight3 +
                'border-bottom: 1px solid #000000; ' +
                'font-size: ' + gm_topLineFontSize3 + '; ' +
                'text-align: ' + gm_topLineTextAlign3 + ';' +
                'color: '+ gm_topLineColor3 + ';"'

var gm_topLine3 = document.createElement("div");
gm_topLine3.setAttribute('id', 'myGM_topLine3');

gm_topLine3.innerHTML = '<div '+ gm_topLineStyle3 + '>' +
        '<div ' + gm_topLineInnerStyle3 + '>' +

"<table background='http://phpmap1.andaloria.de/img/images/kachel_oben.jpg' style=\'border:thin solid black;padding:0.5px;\' align=\'left\'><tr><td>"+
" <span id=\"pos\">0 x 0</span> "+
"</td></tr></table>" +

        '</div></div>';

document.body.insertBefore(gm_topLine3, document.body.firstChild);
