// ==UserScript==
// @name           OGame - Chat TVAK
// @author         ogame.com.mx - xcoxx
// @namespace      http://userscripts.org/scripts/show/138365
// @include        http://uni106.mx.ogame.org/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.*/game/index.php?page=networkkommunikation*
// ==/UserScript==
// VersiÃ³n 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat TVAK ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=178359250&gn=FORNAXTVAK" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/embed.php?id=178359250&GroupName=FORNAXTVAK">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();