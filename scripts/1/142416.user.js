// ==UserScript==
// @name        4Chan Auto GIF Loader
// @namespace   4agl
// @description A script that will automatically play GIFs on 4chan
// @include     *.4chan.org/*
// @version     1.5
// ==/UserScript==

var links = document.getElementsByClassName("fileThumb");

//Thank you chakrit, http://stackoverflow.com/questions/280634/endswith-in-javascript
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

for(var i = 0; i < links.length; i++)
{
	var link = links[i];

	if(endsWith(link.href, ".gif"))
	{
		link.innerHTML = "<img style='float:left' src='" + link.href + "'></img>";
	}
}