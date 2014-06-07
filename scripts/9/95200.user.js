// ==UserScript==
// @name           Marquer les forums comme lus
// @include        http://*muxxu.com/forum
// ==/UserScript==
var enfant = document.createElement("div");
enfant.setAttribute("class","redbox");
enfant.innerHTML='<h2>Outils</h2><a href="http://muxxu.com/forum/readAll">Marquer les forums comme lus.</a>';
noeud = document.getElementById('mxcontent').getElementsByTagName('div')[0];
noeud.childNodes[3].setAttribute('style','margin-bottom:20px;');
noeud.insertBefore(enfant, noeud.childNodes[5]);