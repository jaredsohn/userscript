// ==UserScript==
// @name           OGame - Chat Alianza
// @author         Elwe - ogame.com.es - uniFornax
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni114.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat de la Alianza Senatus by Neu ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=1360569344&gn=Alianza Senatus" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small>Alianza Senatus y Grupo Chat by Neu</a> | <a target="_BLANK" href="http://xat.com/Senatus"> Ir al chat Alianza Senatus en pantalla completa</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();