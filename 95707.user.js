// ==UserScript==
// @name           Note4Tavern
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Notifies you when someone wants to play cards with you
// @include        http://www.heroeswm.ru/*
// ==/UserScript==
// Write YOUR path to file below	
var snd_url = "file://localhost/C:/Users/Victor/Dev/JavaScript/Note4Tavern/Note4TavernScript/hwm_sound1.html";

var card_icon = 'i/top/line/cards.gif';
var all_td_Elements = document.getElementsByTagName('td');
for (var i = 0; i < all_td_Elements.length; i++) 
{
	if(all_td_Elements[i].innerHTML.indexOf(card_icon) != -1  ) 
	{		
		window.open(snd_url, "_blank");
		break;		
	}	
}