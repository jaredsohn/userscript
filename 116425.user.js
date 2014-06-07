// ==UserScript==
// @name		Remove ads from the site clubs.dir.bg
// @author		Georgi Naumov
// @datecreated	2011-10-26
// @lastupdated	2011-10-26
// @namespace	removeAdsFromClubsDirBg
// @include		http*://clubs.dir.bg/*
// @version		0.1
// @description	This is a simple userscript that remove ads from the site clubs.dir.bg.
// ==/UserScript==

var removeAdsFromClubsDirBg = function() {
        var allIframes = document.getElementsByTagName("IFRAME");
        for( var i = 0; i < allIframes.length ; i++) {
                if (/^http:\/\/r5\.dir\.bg\/js_ext\.php.+/i.test(allIframes[i].src)) {
                        allIframes[i].parentNode.removeChild(allIframes[i]);
                }
        }
}
removeAdsFromClubsDirBg();
