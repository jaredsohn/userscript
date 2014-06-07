// ==UserScript==
// @name DeckID
// @namespace InGame
// @author Odul
// @date 22/11/2013
// @version 1.0
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==

Deck.prototype.start=function(id){
    if($('#'+id+' .deck_type_3').length) 
		alert(id);
} 