// ==UserScript==
// @name           OGame Gemini - ChaosRA Chat
// @author         Dioniso - ogame.it - Gemini
// @description    Chat per l'alleanza ChaosRA (Chaos Rebels - Academy) in OGame.it universo Gemini
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://uni107.ogame.it/game/index.php?page=alliance*
// ==/UserScript==
// Version 0.2



(function(){

  var altezza_chat = 500;

  //var elemento = document.getElementById('section31');  //per metterlo nelle circolari

  var elemento = document.getElementById('planet');  //per metterlo nell'immagine della pagina

  var titolo = document.getElementsByTagName('h2');

  titolo[0].innerHTML = 'Gemini - ChaosRA chat ;)';

  var p = document.createElement("p");

  var chat = '<object id="chats99149350" type="application/x-shockwave-flash" data="http://static.99widgets.com/chats/swf/chat.swf?r=149350&l=www" width="654" height="' + altezza_chat + '"><param name="movie" value="http://static.99widgets.com/chats/swf/chat.swf?r=149350&l=www" /><param name="bgcolor" value="#0D1014" /><embed src="http://static.99widgets.com/chats/swf/chat.swf?r=149350&l=www" type="application/x-shockwave-flash" width="654" height="' + altezza_chat + '" bgcolor="#0D1014"></embed></object>'

  elemento.setAttribute('style', 'height:' + (altezza_chat + 35) + 'px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');

  p.innerHTML = chat;

  elemento.appendChild(p);

  // Piccoli cambiamenti grafici
  document.getElementsByClassName('c-left')[0].style.top = '' + (altezza_chat - 6) +'px';
  document.getElementsByClassName('c-right')[0].style.top = '' + (altezza_chat - 6) +'px';

})();





//width="654" height="312"