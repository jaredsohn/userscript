// ==UserScript==
// @name           OGame - Chat Allianz TGC
// @author         titaniumsenator - ogame.de - uni75
// @namespace      http://userscripts.org/scripts/show/77606
// @include        http://uni75.ogame.de/game/index.php?page=overview&session*
// ==/UserScript==
// Version 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = '';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="312" name="chat" FlashVars="id=97075173&xc=2336&cn=336813427&gn=TheGlobalCoreUni75"" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a </a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();