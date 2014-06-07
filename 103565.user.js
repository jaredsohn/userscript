// ==UserScript==
// @name           AkatsukiChat_V1
// @author         Madara - ogame.it - uniJupiter
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni110.ogame.it/game/index.php?page=alliance&session*
// ==/UserScript==


(function(){
  //var elemento = document.getElementById('section31'); 
  var elemento = document.getElementById('planet'); 
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Akatsuki Jupiter';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="400" height="300" name="chat" FlashVars="id=147117180" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=147117180">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();