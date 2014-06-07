// ==UserScript==
// @name           Pinkify
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @description    Adds a button to "Pinkify" your posts
// @include        http*://*what.cd/forums.php?*action=viewthread*
// @version        0.5
// ==/UserScript==

/*
Changelog - 

version 0.5 - Fixed a bug in links

version 0.4 - Added coloring of links :)

version 0.3 - Added replace to remove old color tags

version 0.2 - Added auto-submit

version 0.1 - Initial release
*/

window.addEventListener("load", function(e)
{
	if(document.getElementById('quickreplytext') != null)
	{
		buttons = document.getElementById('quickreplybuttons');
		buttons.innerHTML = '<input type="button" onClick="quoteregexp = /\\[color=[\\s\\S]*?\\]|\\[\\/color\\]/gi; text = document.getElementById(\'quickpost\').value.replace(quoteregexp, \'\');urlregexp = /\\[url=((?:https?|ftps?|irc):\\/\\/[\\s\\S]*?)\\]([\\s\\S]*?)\\[\\/url\\]/ig;urlmatch = urlregexp.exec(text);while (urlmatch != null){	text = text.replace(urlmatch[0], \'[/color][url=\' + urlmatch[1] + \'][color=#FF00CC]\' + urlmatch[2] + \'[/color][/url][color=#FF00CC]\');	urlmatch = urlregexp.exec(text);}justurlregexp = /\\[url\\]((?:https?|ftps?|irc):\\/\\/([\\s\\S]*?))\\[\\/url\\]/ig;justurlmatch = justurlregexp.exec(text);while (justurlmatch != null){	text = text.replace(justurlmatch[0], \'[/color][url=\' + justurlmatch[1] + \'][color=#FF00CC]\' + justurlmatch[2] + \'[/color][/url][color=#FF00CC]\');	justurlmatch = justurlregexp.exec(text);}linkregexp = /\\b(?:https?|ftp|ftps|irc):\\/\\/((?![^\\s]*?(?:\\[\\/url\\]|\\]))[\\-A-Z0-9+&@#\\/%?=~_|$!:,.;]*[A-Z0-9+&@#\\/%=~_|$])/ig;linkmatch = linkregexp.exec(text);while (linkmatch != null){	text = text.replace(linkmatch[0], \'[/color][url=\' + linkmatch[0] + \'][color=#FF00CC]\' + linkmatch[1] + \'[/color][/url][color=#FF00CC]\');	linkmatch = linkregexp.exec(text);}text = \'[color=#FF00CC]\' + text + \'[/color]\';pointlessregexp = /\\[color=#FF00CC\\]\\[\\/color\\]/gi;text = text.replace(pointlessregexp, \'\');document.getElementById(\'quickpost\').value = text;document.getElementById(\'quickpostform\').submit();" value="Pinkify" /> ' + buttons.innerHTML;
	}
}, false);