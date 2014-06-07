// ==UserScript==
// @name OGame - Chat Alianza
// @author uniNekkar
// @namespace http://userscripts.org/scripts/show/12154
// @include http://uni114.ogame.com.es/game/index.php?page=overview*
// @include http://uni114.ogame.com.es/game/index.php?page=alliance*
// @include http://uni114.ogame.com.es/game/index.php?page*
// ==/UserScript==
// Versión 1.0


(function(){
var elemento = document.getElementById('myPlanets');
var titulo = document.getElementsByTagName('h2');
var p = document.createElement("p");
var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="350" height="300" name="chat" FlashVars="id= 174858342" align="bottom" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br>'

;
elemento.setAttribute('style', 'height:746px;background-image:none;');
p.setAttribute('style', 'margin-top:50px;z-index:999;');
p.innerHTML = chat;
elemento.appendChild(p);
})();
