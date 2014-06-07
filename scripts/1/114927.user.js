// ==UserScript==
// @name Chat OGame
// @author Jacke
// @include *http://uni103.ogame.com.br/game/index.php?page=overview*

// ==/UserScript==
// Version 1.0


(function(){
var elemento = document.getElementById('planet'); //para ponerlo en la imagen
var titulo = document.getElementsByTagName('h2');
titulo[0].innerHTML = 'Chat - Anonymous';
var p = document.createElement("p");
var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="low" width="600" height="250" name="chat" FlashVars="id=384106451"" align="middle" allowScriptAccess="sameDomain" type="application/x-//shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a </a></small><br>';
p.setAttribute('style', 'margin: -1px;');
p.innerHTML = chat;
elemento.appendChild(p);
})();