// ==UserScript==
// @name           GanjA Chat
// @author         Bauwser - Stolen from 2 other guy's that I don't care about.
// @include        http://uni3.ogame.nl/game/index.php?page=alliance*
// ==/UserScript==
// Version 1.1


(function(){
  //var element = document.getElementById('section31');
  var elemento = document.getElementById('planet');
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'GanjA Chat ';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="653" height="300" name="chat" FlashVars="id=183811914" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" <br><small><a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=183811914"><img src="http://imageshack.us/a/img38/1209/grootvensterknop.jpg" width="653" height="25" alt=""> </a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);

})();