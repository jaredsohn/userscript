// ==UserScript==
// @name           Soundcloud Direct Stream
// @namespace      http://userscripts.org/users/klette
// @description    Extract direct link to mp3 stream
// @include        http://soundcloud.com/
// ==/UserScript==

var streamUrl = document.getElementById('main-content-inner').innerHTML.match(/streamUrl(.+)http([a-zA-Z\:\.\?]+)/g)[0].split(';')[2].split('&')[0];

if (streamUrl){
	var navbar = document.getElementById('main-nav');
	var mybutton = document.createElement('li');
	var mylink = document.createElement('a');
	mylink.setAttribute('href', streamUrl);
	mylink.appendChild(document.createTextNode('Direct stream URL'));
	mybutton.appendChild(mylink);
	mybutton.setAttribute('class', 'nav no-submenu');
	navbar.appendChild(mybutton);
}