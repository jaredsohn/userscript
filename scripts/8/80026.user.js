// ==UserScript==
// @name           RuneScape 
// @namespace      trikun3.runescape.fullscreen
// @description    Turn RuneScape into a fullscreen view without membership.
// @include        http://runescape.com/game.ws*
// @include        http://www.runescape.com/game.ws*
// @include        http://world*.runescape.com*
// ==/UserScript==


// Define the document to create shorter syntax.
var d=document;

// Regex check (if website is www.runescape.com or runescape.com)
if((/http:\/\/.*\.runescape\.com\/?/i.test(d.location.href)))
{
	// If the url has a valid world (world+int)..
	if((/http:\/\/world\d+\.runescape\.com\/?/i.test(d.location.href)))
	{
		// Remove the advert and menu to make it full screen.
		d.getElementById('gametable').getElementsByTagName('tr')[0].style.display = 'none';
		// Return void to prevent page reload.
		void(0);
	}
	else
	{
		// Load the frame (world(int).runescape.com) for the browser.
		d.location.href = d.getElementsByTagName('frame')[0].src;
	}
}