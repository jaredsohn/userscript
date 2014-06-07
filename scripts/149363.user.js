// ==UserScript==
// @name           OGame - Chat
// @author         Almirante
// @namespace      http://userscripts.org/scripts/source/112037
// @include        http://uni101.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==


(function(){
var elemento = document.getElementById('planet');    //para ponerlo debajo de los circulares
  var titulo = document.getElementsByTagName('h2');
 //para ponerlo en la imagen
titulo[0].innerHTML = 'Chat Lobos';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="250" name="chat" FlashVars="id=183363080" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=183363080">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:280px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();









