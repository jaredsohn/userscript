// ==UserScript==
// @name           VEGA alianza vista
// @author         EmyH - ogame.com.es - VEGA
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://s122-es.ogame.gameforge.com/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat Odin Q ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="350" name="chat" FlashVars="id=168444382" align="left" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small>';
  elemento.setAttribute('style', 'height:350px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();