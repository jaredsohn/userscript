// ==UserScript==
// @name           OGame - Chat Aliança
// @author         Elwe - ogame.com.br - uniFornax
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni103.ogame.com.br/game/index.php?page=alliance&session=*
// ==/UserScript==
// Versión 1.0


(function(){
  var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Chat Fornax Warriors ;)';
  var p = document.createElement("p");
  var chat = '<embed src="http://www.google.com.br/index.html" width="654" height="312" name="chat" align="middle" />';//<br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=80784174">Go Large!</a></small><br>';
  //var chat = <embed src="http://www.google.com.br"> Seu navegador não oferece suporte para quadros entre linhas ou está configurado no momento para não exibi-los.</iframe>
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();