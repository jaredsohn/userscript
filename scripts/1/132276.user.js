// ==UserScript==
// @name           OGame KANDYS Chatas
// @author         Darius
// @namespace      http://userscripts.org/scripts/show/127895 MOD
// @include        http://uni101.ogame.com.es/game/index.php?page=alliance*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Version 1.1


(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'KANDYS ALLY CHATAS';
  var p = document.createElement("p");
  var chat = '<iframe width="650" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowtransparency="true" src="http://chatroll.com/embed/chat/kandys-chat?id=2LCXUEuzEfP&platform=html&w=$0"></iframe><br/><div style="font-size:0.9em;text-align:center;"></div>';
  elemento.setAttribute('style', 'height:350px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();
