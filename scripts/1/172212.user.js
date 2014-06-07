// ==UserScript==
// @name           OGame - Chat Alianza
// @author         Elwe - ogame.com.es - uniFornax
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni116.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'TEGPegasus';
  var p = document.createElement("p");
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNzI1MzUyMjgyNjMmcHQ9MTM3MjUzNTI*MjY2MyZwPTUzMTUxJmQ9Jmc9MiZvPTg5YTY3MzYxNTYzMjRiODc4Zjg*/Y2UwOGExZTRmMzk4Jm9mPTA=.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="650" height="300" name="chat" FlashVars="id=197532986" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=197532986">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();