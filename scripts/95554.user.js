// ==UserScript==
// @name           OGame - Chat Alianza - solo para mi ali
// @author         Elwe - ogame.com.es - uniFornax - Editado - darkbishop
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://kassiopeia.ogame.com.es/game/index.php?page=alliance&session*
// @include        http://uni111.ogame.com.es/game/index.php?page=alliance&session*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat AnGeLSS ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="655" height="220" name="chat" FlashVars="id=130464966" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';
  //elemento.setAttribute('style', 'height:280px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();