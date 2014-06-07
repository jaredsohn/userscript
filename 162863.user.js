// ==UserScript==
// @name           OGame - Chat U.S. Air Force [USAF]
// @author         Yostin - ogame.it - uniQuantum
// @description    ChatRom dell'Alleanza U.S. Air Force [USAF] uni117-Quantum
// Version         1.0
// @date           2013-03-26
// @include        http://uni117.ogame.it/game/index.php?page=alliance*
// ==/UserScript==



(function(){
  //var elemento = document.getElementById('section31');  
  var elemento = document.getElementById('planet'); 
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat US AIR FORCE';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=192919725&rl=Italian" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=192919725">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();