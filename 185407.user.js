// ==UserScript==
// @author         Chicomoura
// @name           OGame - Chat
// @description    Adiciona uma chatbox na pagina do ogame.
// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=alliance*
// @include        http://*.ogame.*/game/index.php?page=allianceBroadcast*
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==


(function(){
  var element = document.getElementById('countColonies');
var p = document.createElement("p"); 
  var chat = '<noscript>Enable Javascript to get full functionality of this <a href="http://www.freeshoutbox.net/">shoutbox</a><br /></noscript><iframe src="http://4nick8.freeshoutbox.net/" height="375" width="668" frameborder="0"></iframe>';
  element.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();
