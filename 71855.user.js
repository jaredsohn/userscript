// ==UserScript==
// @name           Chat Ojo
// @author         AnSnarkista mundo 1-Copiado de: http://userscripts.org/scripts/show/12154
// @namespace      http://userscripts.org/scripts/show/71855
// @include        http://es1.guerrastribales.es/*
// @exclude        http://es1.guerrastribales.es/game.php?village=*&screen=ally&mode=forum
// ==/UserScript==
// Versión 1.0


(function(){
  var elemento = document.getElementById('ds_body');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="500" height="300" name="chat" FlashVars="id=88601734" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';//<br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=88601734">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();
