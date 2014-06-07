// @Chat inplementation by Kobra - ORION
// ==UserScript==
// @Admin       Kobra
// @Sojusz      Sp.Z.o.o
// @author      LPuNKTrifi
// @date        2012-06-10
// @name        Chat
// @namespace   Chat
// @description Kit de utilidades para oGame Redesign 3.0
// @icon        http://s3.amazonaws.com/uso_ss/icon/117512/large.png?1325107247
// @include     http://uni115.ogame.pl/game/index.php?page=alliance
// ==/UserScript==

(function(){
  //var elemento = document.getElementById('section31');  //para ponerlo debajo de los circulares
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'Sp.Z.o.o';
  var p = document.createElement("p");
  var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="660" height="440" name="chat" FlashVars="id=176082099&xc=2336&cn=485375823&gb=g8&gn=SpZoo" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/SpZoo">Go Large!</a></small><br>';
  elemento.setAttribute('style', 'height:466px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();