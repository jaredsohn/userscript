// ==UserScript==
// @name       Ikariam Shorter Header FI
// @namespace  Ikariam Shorter Header FI
// @version    0.1
// @description  Lyhentää ylhäällä olevien linkkien nimiä
// @include    http://s*.fi.ikariam.com/index.php*
// @copyright  2011+, Vili Kinnunen
// ==/UserScript==

var GF_toolbar = document.getElementById("GF_toolbar").innerHTML;

var GF_toolbar = GF_toolbar.replace('<span class="textLabel">Ikariam PLUS','<span class="textLabel">PLUS');
var GF_toolbar = GF_toolbar.replace('<span class="textLabel">Muistiinpanot','<span class="textLabel">Muistio');

document.getElementById("GF_toolbar").innerHTML=GF_toolbar;