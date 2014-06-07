// ==UserScript==
// @name           OGame - Chat Alianza
// @author         Elwe - ogame.com.es - uniFornax - Modificado por: xReVeRSeDx - uniQuantum
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni117.ogame.com.es/game/index.php?page=alliance
// @include        http://uni117.ogame.com.es/game/index.php?page=overview
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares 
    if (document.location == "http://uni117.ogame.com.es/game/index.php?page=alliance" )
    {
 		 var elemento = document.getElementById('planet');  // para que aparezca en la vista alianza
    }
    else
    {
  		var elemento = document.getElementById('contentWrapper'); // para que aparezca en vision general
    }
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat USB';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="300" name="chat" FlashVars="id=189393153" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=189393153">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();