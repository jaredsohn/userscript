// ==UserScript==
// @author         Sigma
// @name           OGame - Chat Vengeful Hydra
// @description    Chat Vengeful Hydra
// @version        1.0
// @include        http://uni108.ogame.hu/*
// ==/UserScript==


(function(){
  var element = document.getElementById('contentWrapper');
var p = document.createElement("p"); 
  var chat = '<iframe frameborder="0" width="100%" height="100%" src="http://weyland.mobilkisokos.hu/chat/index.php"></iframe>';
  p.setAttribute('style', 'margin:0px;position:fixed;top:80px;left:5px;z-index:1;width:12%;height:84%;background-color:black;');
  p.innerHTML = chat;
  element.appendChild(p);
})();