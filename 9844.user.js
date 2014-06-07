// ==UserScript==
// @name           flickr zensur
// @namespace      flickrzensur
// @description    Ersetzt das flickr.com-Logo durch ein passenderes Zensur-Logo (by captainbums, http://www.flickr.com/photos/captainbums/)
// @include        http://*.flickr.com/*
// @include        http://flickr.com/*
// ==/UserScript==

/*
     changes:
     
     2007/06/18: the used image wasn't available any longer, fixed

*/

(function() {

var e = document.getElementsByTagName('img');
for (var i = 0; i < e.length; i++) {
	if (e[i].parentNode.parentNode.className == 'FlickrLogo') {
		e[i].src = 'http://farm2.static.flickr.com/1342/544291740_6e856513ce.jpg?v=0';
		e[i].style.width = '300px';
		e[i].style.height = '75px';
	}
}

})();
