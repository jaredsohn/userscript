// ==UserScript==
// @name           SteamCheck
// @version        0.1
// @author         <ishio2009@gmail.com>
// @include        http://www.amazon.com/*
// @include        http://www.getgamesgo.com/product/*
// @include        http://getgamesgo.com/product/*
// @include        http://www.gamersgate.com/*
// @include        http://www.gamersgate.co.uk/*
// @include        http://www.greenmangaming.com/*
// @include        http://www.impulsedriven.com/*
// @include        http://www.gametap-shop.com/*
// @include        http://*.gamesplanet.com/*
// @namespace      http://sites.google.com/site/gamelocalize/
// ==/UserScript==

/*
yuplay - タイトル名
gamefly - View More Requirements で
*/

(function(){
	console.log('check steam');
	function hasText(txt) {
		if (window.find) return window.find(txt);
		if (document.body.createTextRange) return document.body.createTextRange().findText(txt);
		var t = document.body.innerHTML;
		var v = t.match(new RegExp(txt,'i'));
		return v;
	}
	
	if (hasText('steam')) {
		var elem = document.createElement('div');
		elem.innerHTML = '<img src="http://cdn.store.steampowered.com/public/images/v5/globalheader_logo.png">';
		elem.setAttribute('style',"position: fixed; z-index: 9999; top:0; right:0; padding: 5px; background-image: url('http://cdn.store.steampowered.com/public/images/v5/globalheader_bg.jpg'); background-color:black; ");
		document.body.appendChild(elem);
	}
})();
