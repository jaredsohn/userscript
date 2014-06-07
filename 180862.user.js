// ==UserScript==
// @name       ZT pagination helper
// @version    0.1
// @description  ZT pagination helper
// @match      http://www.zone-telechargement.com/*
// @copyright  2013+, Micht
// ==/UserScript==

var url=document.location.href;
var reg=new RegExp("(.*/page/)([0-9]+)(/.*)", "g");
 
if (url.match(reg)) {
	document.addEventListener('scroll', function (event) {
		if (document.body.scrollHeight - (document.body.scrollTop + window.innerHeight) <= 100) {
            var urlParts = url.split(reg);
            urlParts[2]++;
            var urlNext = urlParts.join("");
            
            setTimeout(function(){document.location.href = urlNext;}, 1000);
		}
	});
}
