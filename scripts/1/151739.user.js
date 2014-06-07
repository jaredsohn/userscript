// ==UserScript==
// @name           Ogame chat PSK2 VEGA
// @author         HULK - ogame.com.es - unioVEGA
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://s122-es.ogame.gameforge.com/game/index.php?page=alliance*
// arroba include  http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'PSK2  Chat';
  var p = document.createElement("p");
     var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat PSK2" FlashVars="id=185407520" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=185407520">Go Large!</a></small><br>';

  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();

