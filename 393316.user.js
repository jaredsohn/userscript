// ==UserScript==
// @name           OGame - Chat 
// @author         Elwe - ogame.com.es - uniFornax
// @namespace      http://userscripts.org/scripts/show/393316
// @include        http://s107-hr.ogame.gameforge.com/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //
  var elemento = document.getElementById('planet');  //
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'SWATW';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=205932004" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.php" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=205932004">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();