// De-ad Facebook
// version 4.4
// 2008-11-26
// by Diego De Vita
//
// ==UserScript==
// @name           De-ad Facebook
// @description    Hides ads from Facebook
// @include        http://*.facebook.com/*
// ==/UserScript==

//removes iframes where the src attribute match the [regex]
function remove(regex) {	
	var nodes = document.getElementsByTagName('iframe');	
	for (i in nodes){		
		obj = nodes[i];
		value = obj.src;
		if (regex.test(value)) obj.parentNode.removeChild(obj);
	} 	
}

//hides the sidebar in the profile page
GM_addStyle('#sidebar_ads { visibility:hidden !important }');

//removes on the home section: the sidebar sponsor area and the sponsored feeds	
GM_addStyle('.social_ad, .sponsor { display:none !important }');	

//scheduled to run once every half second
//tries to remove unknown ads using generic patterns, actually every box on every page that could contain a banner
var srcPattern = /(\/(\w{1,3}|\w*?[aA]ds?|google_[^_]+_slot)\.(htm|html|asp|aspx|php)\?|monetize|banner)/;
setInterval(function(){remove(srcPattern);},500);
