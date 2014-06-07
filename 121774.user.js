// ==UserScript==
// @version     Rifiq
// ==UserScript==
// @version     Rifiq
// @author      LPuNKTrifi
// @date        2011-12-29
// @name        Chat
// @namespace   Chat
// @description Kit de utilidades para oGame Redesign 3.0
// @icon        http://s3.amazonaws.com/uso_ss/icon/117512/large.png?1325107247
// @include     http://uni104.ogame.pl/game/index.php?page=alliance
// ==/UserScript==

(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Guardians of Eternity';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://goe.cba.pl/chat/index.php" quality="high" width="670" height="450" name="chat" align="middle" pluginspage="http://goe.cba.pl/chat/index.php" />';
  elemento.setAttribute('style', 'height:466px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();