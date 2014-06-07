// ==UserScript==
// @name           HTML5 embedded youtube videos
// @namespace      html5
// @description    Changes the way of embedding youtube videos from old 'object' to new 'iframe'
// @include        *
// ==/UserScript== 

var insertLink = 1;



var n = 0;
while (document.getElementsByTagName("object")[n] != undefined)
{
    var currentElement = document.getElementsByTagName("object")[n];
    if (currentElement.getElementsByTagName("embed")[0] != undefined)
	if ((currentElement.getElementsByTagName("embed")[0].src.indexOf("http://www.youtube.com/") == 0) || 
	    (currentElement.getElementsByTagName("embed")[0].src.indexOf("http://www.youtube-nocookie.com/") == 0))
    {
	var newElement = document.createElement('iframe');
	newElement.setAttribute('class', 'youtube-player');
	newElement.setAttribute('width', currentElement.width);
	newElement.setAttribute('height', currentElement.height);
	var src = currentElement.getElementsByTagName("embed")[0].src;
	newElement.setAttribute('frameborder', '0');
	src = src.replace('.com/v/', '.com/embed/');
	src = src.split('&')[0];
	newElement.setAttribute('src', src);
	currentElement.parentNode.insertBefore(newElement, currentElement);
	if (insertLink == 1)
	{
	    var link = document.createElement('a');
	    link.setAttribute('href', 'http://www.youtube.com/watch?v=' + src.substring(src.lastIndexOf('/') + 1, src.length));
	    link.innerHTML = 'Watch this video on Youtube';
	    var br = document.createElement('br');
	    currentElement.parentNode.insertBefore(br, currentElement);
	    currentElement.parentNode.insertBefore(link, currentElement);
	}
	currentElement.parentNode.removeChild(currentElement);
	n--;
    }
    n++;
}