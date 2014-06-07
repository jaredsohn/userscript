// ==UserScript==
// @name           Add IMDB link to Runtime
// @namespace      http://www.imdb.com
// @description    Add link to Runtime
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// @author         ewolfman
// ==/UserScript==

var genre = null;
var runtime = null;
var bs = document.getElementsByTagName('h5');

for (var i = 0; i < bs.length; i++) {
	if ( bs[i].innerHTML == 'Genre:' ) {
		genre = bs[i];
	} else if ( bs[i].innerHTML == 'Runtime:' ) {
		runtime = bs[i];
		runtime.innerHTML = "<a name='runtime'>" + runtime.innerHTML + "</a>";
		break;
	}
}

if ( genre != null && runtime != null ) {
	var div = genre.parentNode.parentNode;
	div.innerHTML = "<h5><a href='#runtime'>Runtime</a></h5><br/>" + div.innerHTML;
}
