// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PHP-Map Buttons
// @description   buttons zur php-map
// @include       http://game1.andaloria*/*
// @exclude       http://phpmap1.andaloria.de/*
// @exclude       http://bloodsharks.org/*
// @exclude       http://map.bloodsharks.org/*
// @exclude       http://tt.andaloria.de/*
// @exclude       http://game1.andaloria.de/Login.php
// @exclude       http://forum.andaloria.de/*
// ==/UserScript==

// standart php-map

var gm_topLineHeight = '2em';
var gm_topLineColor = '#FFF';

var gm_topLineFontSize = 'small';
var gm_topLineTextAlign = 'left';

var gm_topLineStyle = 'style="'+
                'height :' + gm_topLineHeight + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor + ';"'

var gm_topLineInnerStyle = 'style="' +
                'position: absolute; top:146px; left:905px; ' +
                'width: 30px; ' +
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
        "<a href=\'http://map.bloodsharks.org/map.php\' titel=\'PhpMap\' target=\'_blank\'><img id=\'bulletin\' src=\'http://marsh-mellow.de/anda/ok.jpg\' alt=\'PhpMap\' onmousemove=\"showText(event,\'PhpMap\')\" onmouseout=\"hideText()\"></a>" +
        '</div></div>';

document.body.insertBefore(gm_topLine, document.body.firstChild);


// php-map button mit koordinatenuebergabe
// wird nur auf der map erzeugt


var inhaltx = document.getElementById("coord_x").value;
var inhalty = document.getElementById("coord_y").value;

if (inhaltx != ""){
var gm_topLineHeight2 = '2em';
var gm_topLineColor2 = '#FFF';

var gm_topLineFontSize2 = 'small';
var gm_topLineTextAlign2 = 'left';

var gm_topLineStyle2 = 'style="'+
                'height :' + gm_topLineHeight2 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor2 + ';"'

var gm_topLineInnerStyle2 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: absolute; top:175px; left:560px; ' +
                'width: 20px; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight2 +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 5px; ' +
                'font-size: ' + gm_topLineFontSize2 + '; ' +
                'text-align: ' + gm_topLineTextAlign2 + ';' +
                'color: '+ gm_topLineColor2 + ';"'

var gm_topLine2 = document.createElement("div");
gm_topLine2.setAttribute('id', 'myGM_topLine2');

gm_topLine2.innerHTML = '<div '+ gm_topLineStyle2 + '>' +
        '<div ' + gm_topLineInnerStyle2 + '>' +
        '<a href=\'http://map.bloodsharks.org/map.php?x=' + inhaltx + '&y=' + inhalty + '\'titel=\'PhpMap\' target=\'_blank\'><img id=\'bulletin\' src=\'http://marsh-mellow.de/anda/ok2.jpg\' alt=\'PhpMap\' onmousemove=\"showText(event,\'PhpMap ' + inhaltx + ':' + inhalty + '\')\" onmouseout=\"hideText()\"></a>' +
        '</div></div>';

document.body.insertBefore(gm_topLine2, document.body.firstChild);
}




