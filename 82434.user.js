// ==UserScript==
// @name           Kigard - Profil compacté
// @namespace      none
// @include        http://www.kigard.fr/index.php?s=1&p=profil
// ==/UserScript==
function $(id){return document.getElementById(id);}

body = document.getElementsByTagName('body')[0];

body.innerHTML = body.innerHTML.replace('<h3>C','<div id="carac"><h3>C');
body.innerHTML = body.innerHTML.replace('</blockquote>','</blockquote></div>');
body.innerHTML = body.innerHTML.replace('<h3>D','<div id="description"><h3>D');
body.innerHTML = body.innerHTML.replace('</blockquote>	','</blockquote></div>');

$('contenu').style.position = 'relative';
$('carac').style.padding = '10px';
$('description').style.position = 'absolute';
$('description').style.right = '10px';
$('description').style.width = '420px';
$('description').style.top = '76px';

document.getElementsByTagName('blockquote')[0].style.height = '224px';