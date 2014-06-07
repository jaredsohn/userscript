// ==UserScript==
// @name           OGame - The Hunters of Ragnarok [THOR]
// @author         prOgamer - ogame.com.pt - uniKassiopeia
// @description    ChatRom da Aliança The Hunters of Ragnarok [THOR] uni111-Kassiopeia
// Version         1.1
// @date           2013-04-09
// @include        http://uni111.ogame.com.pt/game/index.php?page=alliance*
// ==/UserScript==



(function(){
  //var elemento = document.getElementById('section31');  
  var elemento = document.getElementById('planet'); 
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat Aliança THOR';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=193495247&rl=Portuguese" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=192919725">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();