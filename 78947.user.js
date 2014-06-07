// ==UserScript==
// @name           LyricWiki Copy
// @namespace      net.miell.lyricwikicopy
// @description    Morons at LyricWiki don't want you copying song lyrics. This fixes that.
// @include        http://lyrics.wikia.com/*
// ==/UserScript==

/*
The styling that prevents the selection of the lyric text is
added by a script, so delete the class to prevent the script
from finding the element and then manually apply the style
since the stylesheet's class selector no longer applies.
*/

(function ()
{
	var lbox = document.getElementsByClassName('lyricbox')[0];
	lbox.removeAttribute('class');
	lbox.setAttribute('style', 'background-color:#FFFFCC; border:1px solid silver; color:black; padding:1em;');
})();