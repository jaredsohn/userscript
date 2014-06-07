// ==UserScript==
// @name           OGame - Chat Alianza
// @author         Elwe - ogame.com.es - uniFornax editado por AnSnarkista - uniAndromeda
// @namespace      http://userscripts.org/scripts/show/70427
// @include        http://andromeda.ogame.com.es/game/index.php?page=overview&session*
// ==/UserScript==
// Versión 1.0


(function(){
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="654" height="312" name="chat" FlashVars="id=76072042" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';//<br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=76072042">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();
