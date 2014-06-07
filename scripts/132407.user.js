// ==UserScript==
// @name          'IMDb - Load Criticker in new tab'
// @namespace     http://so-fabulo.us
// @description   Opens Criticker page in new tab on load of a imdb page.

// @include       http://*.imdb.com/title/*/
// @include       http://*.imdb.com/title/*/#*
// @include       http://*.imdb.com/title/*/combined*
// @include       http://*.imdb.com/title/*/maindetails*
// ==/UserScript==

function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	return title;
}

function openCriticker(title) {

GM_openInTab("http://www.criticker.com/?st=movies&h="+title+"&g=Go");

}

var title = getTitle();
openCriticker(title);








