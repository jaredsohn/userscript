// ==UserScript==
// @name           HideLiruMenu
// @namespace      lirumenu >B lilumi http://lilumi.org.ua
// @description    скрываем панель когда не нужно
// @include        http://liveinternet.ru/*
// @include        http://*
// ==/UserScript==
var css="div#GlFtrInnr { display: none !important; } span[id=bantop_span]{ display: none !important; }";

var heads = document.getElementsByTagName("head");

	if (heads.length > 0) {

var node = document.createElement("style");

		node.type = "text/css";

		node.appendChild(document.createTextNode(css));

		heads[0].appendChild(node); 

		}

var menubtn, MenuLiru
MenuLiru = document.getElementById("GlHdr");
if (MenuLiru = document.getElementById("GlHdr"))
{ MenuLiru.style.display='none';
  menubtn= document.createElement("span");
  menubtn.innerHTML='<a href="#" OnClick="if (MenuLiru.style.display=="block";) MenuLiru.style.display="none";else MenuLiru.style.display="block";> Меню</a>';
  MenuLiru.parentNode.insertBefore(menubtn, MenuLiru.nextSibling);
 } 