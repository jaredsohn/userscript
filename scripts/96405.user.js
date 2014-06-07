// ==UserScript==
// @name           Chat de Alianza
// @author         Gui - ogame.com.es
// @namespace      http://userscripts.org/scripts/admin/96405
// @include        http://*.ogame.*/game/index.php?page=message*
// ==/UserScript==
// Versión 1.0

  var lugar = document.getElementById('siteFooter');
  var lineachat = document.createElement("p");

  
var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="540" height="405" name="chat" FlashVars="id=131804402&rl=Castilian" align="middle" allowScriptAccess="sameDomain" allowfullscreen="false" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml">';
  lugar.setAttribute('style', 'height:350px;background-image:none;');
  lineachat.setAttribute('style', 'margin:0px;');
  lineachat.innerHTML = chat;
  lugar.appendChild(lineachat);

