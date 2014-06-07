// ==UserScript==
// @name           Sapo Vídeos Direct Link
// @namespace      somini
// @description    Inclui links directos nas páginas dos Sapo Vídeos
// @include        /^http://videos\.sapo\.pt/[a-zA-Z0-9]+$/
// ==/UserScript==

 
window.addEventListener("load", function(e) {
  changeHTML();
}, false);
 
function changeHTML(){
	var elm = document.getElementsByClassName('video-main');
	elm[0].innerHTML = "<a href=\""+window.location+"/mov/1\"><h2>Link Directo para o Vídeo</h2></a>" + "<p>" + elm[0].innerHTML;
}