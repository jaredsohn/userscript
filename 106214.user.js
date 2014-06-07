// ==UserScript==
// @name           OGame - Chat Alianza Arrrrg
// @author         G&Y - ogame.com.es - uniElectra
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni105.ogame.com.es/game/index.php?page=alliance*
// @description    Añade una ventana de chat en la seccion Alianza
// ==/UserScript==
// Versión 1.0.0


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Arrrg';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://xat.com/web_gear/chat/activategroup.php?id=1830373434&gn=Arrrg" quality="high" width="650" height="300" name="Alianza" FlashVars="id=1830373434" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';
  elemento.setAttribute('style', 'height:346px;background-image:url(http://i136.photobucket.com/albums/q179/joombly/bg_metal/metal_2.gif) repeat;;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();