// ==UserScript==
// @name        Wyłącz miganie na www.gazetapolska.pl
// @namespace   http://localhost
// @description Wyłącza miganie nazwisk autorów wpisów na gazecie polskie
// @include     http://www.gazetapolska.pl/
// @include     http://gazetapolska.pl/
// @version     1
// ==/UserScript==

$('.views-field-tid-1').addClass('views-field-tid-2');
$('.views-field-tid-2').removeClass('views-field-tid-1');
var style = document.createElement('style');
style.innerHTML = '.view-glowna .views-field-tid-2 {\n' +
    'color: #730000;\n' +
    'font-weight: 700;\n' +
    'text-align: right;\n' +
'}';
$(document.body).append(style);