// ==UserScript==
// @name           Zerg Hive Mind Chat
// @author         DarkEdge - Stolen from some other guy that I don't care about.
// @include        http://uni114.ogame.org/game/index.php?page=alliance*
// ==/UserScript==
// Version 1.0


(function(){
  //var elemento = document.getElementById('section31');
  var elemento = document.getElementById('planet');
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Zerg Chat ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=180011804" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb"></a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=147291988"></a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();