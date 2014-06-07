// ==UserScript==
// @name       indiegamebundles bundle info page skipper
// @namespace  http://www.tomcss.com/
// @version    0.1
// @description  Skips the information page about the bundle and forwards you straight to the bundle
// @match      http://www.indiegamebundles.com/*/
// @copyright  2013+, scheper@gmail.com
// ==/UserScript==
var p = document.getElementsByTagName( 'p');
for( var i=0; i<p.length; i++) if( p[i].innerText.match(/it over at/)) document.location.href = p[i].getElementsByTagName('a')[0].href;
