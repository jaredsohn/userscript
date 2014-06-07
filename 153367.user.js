// ==UserScript==
// @name           Ogame Chat DWs 
// @author         Bocatapalamama - ogame.com.es - unipesasus
// @include        http://uni116.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0
(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Alianza Blood Chat';
  var p = document.createElement("p");
     var chat = '<embed src="http://damned-warriors.foroactivo.com/chatbox/index.forum" quality="high" width="650" height="300" name="chat" "align="middle" allowScriptAccess="sameDomain"/>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();
