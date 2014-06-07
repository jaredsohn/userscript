// ==UserScript==
// @name           Ogame chat hulk nekkar
// @author         HULK - ogame.com.es - uniNekkar
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni114.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Templar Knight Chat HULK ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=162355615&gn=AlianzaTK2" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small>Alianza T.K y T.K2 Grupo Chat by HULK</a> | <a target="_BLANK" href="http://xat.com/AlianzaTK2"> ir a chat AlianzaTK2 pantalla completa</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();