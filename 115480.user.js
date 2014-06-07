// ==UserScript==
// @name           fetkitten
// @namespace      http://example.com
// @description    NOW WITH KITTENS! HOVER OVER KITTENS TO SEE PICS!
// @include        https://fetlife.com/*
// ==/UserScript==

(function(){
	var images = document.getElementsByTagName('img')
	for (var n = 0; n < images.length; n++) {
		var each = images[n]
		var css = each.getAttribute('class')
		if (/avatar/.test(css)) continue;
		var w = each.getAttribute('width')
		var h = each.getAttribute('height')
		var src = each.getAttribute('src')
		var kitten = 'http://placekitten.com/'+(w||130)+'/'+(h||w||90)
		each.setAttribute('src',kitten)
		each.setAttribute('onMouseOver','this.src="'+src+'"')
		each.setAttribute('onMouseOut','this.src="'+kitten+'"')
		each.setAttribute('class',css+" kitten")
		GM_addStyle(".kitten { opacity: 1 !important } ")
	}		
})()