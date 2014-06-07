// ==UserScript==
// @name           Chat
// @namespace      Ch
// @description    c
// @include        http://hydra.ogame.*/game/index.php?page=alliance&session*
// ==/UserScript==


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat Exode by Crypto';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="312" name="chat" FlashVars="id=97471938" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml"/>';

  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();
