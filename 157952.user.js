// ==UserScript==
// @name        RockPaperShotgun Fake Link Warning
// @namespace   http://userscripts.org/users/didero
// @author      Didero
// @description Spambots in the comments on RockPaperShotgun have taken to hiding links to spam sites behind text that looks like a link to a Youtube video or something. This script adds a warning to those links.
// @include     http://www.rockpapershotgun.com/20*
// @include     http://www.rockpapershotgun.com/19*
// @version     1.0
// @grant       none
// ==/UserScript==

var warningText = ' (<b>FAKE!</b>)'; //Text to display after a deceptive link
var possibleWarningText = ' (possible <b>fake</b>!)'; //If it's possibly a deceptive link, add this text

var commentSection = document.getElementById('comments');
if (commentSection) {
	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	function getDomain(url) {
		var templink = document.createElement('a');
		templink.href = url;
		return templink.hostname;
	}

	//Go through all links posted in the comments
	var commentLinks = commentSection.getElementsByTagName('a');
	for (var i = 0, len = commentLinks.length; i < len; ++i) {
		var commentLink = commentLinks[i];
		//If the text displayed is a URL, check if it's the same as what the link actually links to
		if (commentLink.innerHTML.indexOf('http://') > -1 || commentLink.innerHTML.indexOf('https://') > -1) {
			//Go through this malarky instead of using the link.innerHTML directly to resolve HTML entities (&amp; to &, etc)
			var linktext = commentLink.innerHTML;
			var characterResolver = document.createElement('pre');
			characterResolver.innerHTML = linktext;
			linktext = characterResolver.firstChild.nodeValue;
			
			//Ignore the difference if the link ends with a slash and the text doesn't, or vice versa
			if (endsWith(commentLink.href, '/') && !endsWith(linktext, '/')) linktext += '/';
			else if (!endsWith(commentLink.href, '/') && endsWith(linktext, '/')) linktext = linktext.substring(0, linktext.length-2);
			
			//Check if the domains match, if they don't, add a warning
			if (getDomain(linktext) != commentLink.hostname) {
				commentLink.innerHTML += warningText;
			}
			//If the domain names match, make sure the entire URL matches too, just to be sure
			else if (linktext != commentLink.href) {
				commentLink.innerHTML += possibleWarningText;
			}
		}
	}
}