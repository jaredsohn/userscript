// ==UserScript==
// @name           Ogame chat BadBoys Io
// @author         Vali
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni109.ogame.ro/game/index.php?page=alliance*
// arroba include        http://*.ogame.ro/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 69.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Legendar  Chat';
  var p = document.createElement("p");
     var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNTU4MzM3NjAyNjUmcHQ9MTM1NTgzMzc4NTIzNCZwPTUzMTUxJmQ9Jmc9MSZvPTY4NWQ5NmIxZTEyNjQyZWVhZmE4/YTU1NDUyNzY3YTRi.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="600" height="300" name="chat" FlashVars="id=187767602" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=187767602">Go Large!</a></small><br>';

  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();

