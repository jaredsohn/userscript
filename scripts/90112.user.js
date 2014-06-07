// ==UserScript==
// @name           OGame - Chat T.D.O.H.
// @author         Vader de Romania
// @namespace      
// @include        http://*.ogame.it/game/index.php?page=alliance&session=*
// ==/UserScript==
// Version 1.0


(function(){
  //var elemento = document.getElementById('section31');  
  var elemento = document.getElementById('planet');  
  var titulo = document.getElementsByTagName('h2');
  titulo[0].innerHTML = 'The Damned Of Hydra';
  var p = document.createElement("p");
  var chat = '<object id="chats99113676" type="application/x-shockwave-flash" data="http://static.99widgets.com/chats/swf/chat.swf?r=113676&l=it" width="650" height="300"><param name="movie" value="http://static.99widgets.com/chats/swf/chat.swf?r=113676&l=it" /><param name="bgcolor" value="#ffffff" /><embed src="http://static.99widgets.com/chats/swf/chat.swf?r=113676&l=it" type="application/x-shockwave-flash" width="650" height="300" bgcolor="#ffffff"></embed><br><a href="http://www.99chats.com/directory">chat rooms</a></object>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();