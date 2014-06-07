// ==UserScript==
// @name           LesserEvil Fix
// @namespace      http://userscripts.org/user/60424
// @description    Fixes button fonts and centering
// @include        http://www.lesserevil.com/*
// ==/UserScript==

var buttons = document.getElementsByClassName("btnstyle1");
for (var i=0; i<buttons.length; i++)
	buttons[i].style.fontFamily = "Verdana";

var div = document.getElementsByClassName("outer");
div[0].childNodes[1].style.margin = "auto";

var imgs = document.getElementsByTagName("img");
for (var i=0; i<imgs.length; i++)
	if (imgs[i].src == "http://www.lesserevil.com/images/btn_continueshopping.gif")
		var cont = imgs[i];
	else if (imgs[i].src == "http://www.lesserevil.com/images/btn_checkout2.gif")
		var checkout = imgs[i];
		
checkout.parentNode.innerHTML = "<input class=\"addtocart_btn btnstyle1\" type=\"submit\" value=\"Checkout\" style=\"font-family: Verdana;\"/>";		
cont.parentNode.innerHTML = "<input class=\"addtocart_btn btnstyle1\" type=\"submit\" value=\"Shop More\" style=\"font-family: Verdana;\"/>";