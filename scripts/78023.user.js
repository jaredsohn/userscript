// ==UserScript==
// @name		Selectable lyrics on Lyrikwiki.org
// @namespace	http://florianckerstorfer.com/userscripts/lyricwiki.org
// @description Makes the lyrics on Lyricwiki.org selectable, so that you can copy them.
// @include     http://lyrics.wikia.com/*
// @exclude		http://lyrics.wikia.com/Main_Page
// @exclude		http://lyrics.wikia.com/Category:*
// @exclude		http://lyrics.wikia.com/Special:*
// @exclude		http://lyrics.wikia.com/LyricWiki:*
// @exclude		http://lyrics.wikia.com/Help:*
// @exclude		http://lyrics.wikia.com/index.php*
// ==/UserScript==

window.setTimeout(function(){
	var elements = document.getElementsByClassName('lyricbox');
	for (var i = 0; i < elements.length; i++)
	{
		if (typeof elements[i].onselectstart!="undefined") // IE
		{
			elements[i].onselectstart=function(){return true};
		}
		else if (typeof elements[i].style.MozUserSelect!="undefined") // Moz-based (FireFox, etc.)
		{
			elements[i].style.MozUserSelect="text";
		}
		else
		{
			elements[i].onmousedown=function(){return true};
		}
		elements[i].style.cursor = "text";
	}
}, 500);
