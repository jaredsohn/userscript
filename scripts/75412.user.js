// ==UserScript==
// @name Aviso Ataque
// @namespace By Basti, Modificado por Cutuko
// @description Muestra Alerta de Ataque
// @include http://*faveladogame.com.br/*
// ==/UserScript==

GM_xmlhttpRequest({
method: 'GET',
url: 'http://www.faveladogame.com.br/fight/overview/',
onload: function(responseDetails) {
var content = responseDetails.responseText;
if(content.match(/warning/)){
newa = document.createElement('a');
newa.setAttribute('class', 'new_msg_infoscreen');
newa.setAttribute('href', '/fight/overview/#');
newa.setAttribute('title', 'Ataque detallado');
newa.setAttribute('style', 'margin-right:35px');
newimg = newa.appendChild(document.createElement('img'));
newimg.setAttribute('src', 'http://media.pennergame.de/img/attackwarning.png');
newimg.setAttribute('width', '15');
newimg.setAttribute('height', '15');
newimg.setAttribute('border', '0');
document.getElementById("options").insertBefore(newa, document.getElementsByTagName("counter1"[0]);
}
}
});