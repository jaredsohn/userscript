// ==UserScript==
// @name Ogame chat Cazadores Galacticos Nekkar
// @author Xose - ogame.com.es - uniNekkar
// @namespace http://userscripts.org/scripts/show/12154
// @include http://uni114.ogame.com.es/game/index.php?page=alliance*
// arroba include http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0

(function(){
//var elemento = document.getElementById('section31'); //para ponerlo debajo de los circulares
var elemento = document.getElementById('planet'); //para ponerlo en la imagen
var titulo = document.getElementsByTagName('h2');
titulo[0].innerHTML = 'Cazadores Galacticos Chat';
var p = document.createElement("p");
var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMjcyNjA5NzAzNDMmcHQ9MTMyNzI2MTA3MzQ1MyZwPTUzMTUxJmQ9Jmc9MSZvPWZjMzUwNTliYmVlZjRkNTE5ODk2/OTkwMGZkNTc5NzRh.gif" /><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMjc5NjY*NDE*MzcmcHQ9MTMyNzk2NjQ1NTI2NSZwPTUzMTUxJmQ9Jmc9MSZvPWZjMzUwNTliYmVlZjRkNTE5ODk2/OTkwMGZkNTc5NzRh.gif" /><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzMjc5Njg*NTI*ODQmcHQ9MTMyNzk2ODQ3MDM*MyZwPTUzMTUxJmQ9Jmc9MSZvPWZjMzUwNTliYmVlZjRkNTE5ODk2/OTkwMGZkNTc5NzRh.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=174858342" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Cazadores Galacticos Nekkar</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=174858342">Chat en Pantalla Completa</a></small><br>';
elemento.setAttribute('style', 'height:346px;background-image:none;');
p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
elemento.appendChild(p);
})();