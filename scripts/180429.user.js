// ==UserScript==
// @name           OGame - Chat Alleanza
// @author         Empire Legacy
// @namespace      http://userscripts.org/scripts/show/180429
// @include        http://s121-it.ogame.gameforge.com/game/index.php?page=alliance
// ==/UserScript==
// @version        1.1


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="654" height="320" name="chat" FlashVars="id=201999282&gn=EmpLegacy" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';//<br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=132976276&rl=Italian">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:350px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();