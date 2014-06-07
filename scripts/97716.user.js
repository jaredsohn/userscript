// ==UserScript==
// @name OGame - Chat Alianza T.L.H v2
// @author Elwe - ogame.com.es - uniGEMINI
// @namespace http://userscripts.org/scripts/show/97716
// @include http://uni107.ogame.com.es/game/index.php?page=alliance*
// @include http://gemini.ogame.com.es/game/index.php?page=alliance*
// ==/UserScript==
// Versión 1.0


(function(){

var footer = document.getElementById('siteFooter');// para planeta
//var titulo = document.getElementsByTagName('h2');
//titulo[0].innerHTML = 'CHAT The Last Hope';
var p = document.createElement("p");
var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="710" height="500" name="chat" FlashVars="id=117035576" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br>';


//elemento.setAttribute('style', 'height:346px;background-image:none;');
p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
footer.appendChild(p);

})(); 