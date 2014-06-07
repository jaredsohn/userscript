// ==UserScript==
// @author         Sigma (Immortal)
// @name           Immortal - Chat 1.0
// @description    Chat az Immortal szövetségnek az Áttekintés, Szövetség és a Flotta mozgások menüpontokba.
// @include        http://uni104.ogame.hu/game/index.php?page=overview*
// @include        http://uni104.ogame.hu/game/index.php?page=alliance*
// @include        http://uni104.ogame.hu/game/index.php?page=allianceBroadcast*
// @include        http://uni104.ogame.hu/game/index.php?page=movement*
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<iframe src="http://immortal.emamedia.hu/chat/index.php" width="670" height="670"></iframe><br><br>';
  element.setAttribute('style', 'height:367px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  element.appendChild(p);
})();