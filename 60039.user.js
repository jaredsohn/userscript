// ==UserScript==
// @name           Menu des Pirates2
// @version        0.9.1
// @namespace      Alliance Francois l'Olonnais
// @description    Un pack d'outils pour les pirates du serveur epsilon d'ikariam
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================

//
// un m�lange de plusieur script s r�adapt� pour les besoins de notre alliance.
// Ikariam and WikIkariam are copyrighted by their respective owners.
// Sur Firefox 3 le module Forum and News ne fonctionne pas!
//menue ODL
var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'
+ 'align:right;'
+ 'margin-left:867.5px;'
+ 'margin-top: -16.5px;'
+ 'color:red;'
+ 'width: 60px;'
+ 'cursor: arrow;'
+ '}'
+ '#menu ul {'
+ 'list-style: none;'
+ 'margin: 0;'
+ 'padding: 0;'
+ 'width: 13em;'
+'}'
+ '#menu a, #menu h2 {'
+ 'font: bold 11px/16px arial, helvetica, sans-serif;'
+ 'display: block;'
+ 'margin: 0;'
+ 'padding: 2px 3px;'
+ 'cursor: hand;'
+ '}'
+ '#menu a {'
+ 'color: RGB(84,44,15);'
//Couleur du menu
+ 'background: RGB(246,235,188);'
+ 'border: double 3px RGB(84,44,15);'
+ 'border-left: double 3px RGB(84,44,15);'
+ 'border-right: double 3px RGB(84,44,15);'
+ 'text-decoration: none;'
+ '}'