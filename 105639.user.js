// ==UserScript==
// @name OGame - Chat Alianza
// @author Elwe - ogame.com.es - uniFornax
// @namespace http://userscripts.org/scripts/show/65521
// @include http://uni50.ogame.com.es*
// @description    Añade una ventana de chat al final de cada pagina
// ==/UserScript==
// Versión 1.0


(function(){

var footer = document.getElementById('siteFooter');// para planeta
//var titulo = document.getElementsByTagName('h2');
//titulo[0].innerHTML = 'CHAT TITANES';
var p = document.createElement("p");
var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="710" height="500" name="chat" FlashVars="id=149552415" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br>';


//elemento.setAttribute('style', 'height:346px;background-image:none;');
p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
footer.appendChild(p);

})(); 