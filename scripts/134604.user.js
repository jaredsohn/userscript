// ==UserScript==
// @name           SOA_Chat_V1
// @author         CuscinoMorbido - ogame.it - uniNekkar
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://*/game/index.php?page=alliance
// ==/UserScript==

(function(){
  //var elemento = document.getElementById('section31'); 
  var elemento = document.getElementById('planet'); 
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'SOA Nekkar ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="400" height="300" name="chat" FlashVars="id=175327480" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=175327480">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();