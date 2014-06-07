// ==UserScript==
// @name           OGame - Chat Alleanza N.W.
// @author         Elwe - ogame.com.es - uniFornax
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni110.ogame.it/game/index.php?page=alliance*
// arroba include        http://uni110.ogame.it/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat N.W.';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="140" name="chat N.W." FlashVars="id=160175495" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=160175495">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:166px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();








