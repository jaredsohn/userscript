// ==UserScript==
// @name           OGame - Chat testowy
// @author         tonyviroos
// @description    Chat testowy sojuszu
// Version         1.0
// @date           2013-04-8
// @include        http://uni119.ogame.pl/game/index.php?page=alliance*
// ==/UserScript==

(function(){
  //var elemento = document.getElementById('section31');  
  var elemento = document.getElementById('planet'); 
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat testowy';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="400" height="300" name="chat" FlashVars="id=193715706&rl=Polish" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />'
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();