// ==UserScript==
// @name           OGame - Chat Alianza Gn1
// @author         Elwe - ogame.com.es - uniFornax
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni50.ogame.com.es/game/index.php?page=alliance*
// @description    Añade una ventana de chat en la seccion Alianza
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Alianza Gn1';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="Alianza" FlashVars="id=147480674" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();