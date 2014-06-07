// ==UserScript==
// @name			Disable Forum Attachment Targets
// @namespace		http://revvy.box43.net/
// @description		Disable target for some forum attachments (tested in IPB Forums)
// @include			*
// ==/UserScript==

/** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 ** Code by:
 ** Josh Matthews, based off of Disable Targets for Downloads by Jason Rhyley
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **
 ** If you find this doesn't work on a type of forum (vBulletin, phpBB, etc) please send me
 ** (mrlachatte[at]gmail.com) a link to a thread with an attachment, I'll add support for it if possible.
 **/
 
(function () {
	var l = document.links; 
	for (var i=0; i<l.length; i++){
		var a = l[i].getAttribute("href");
		var k = a.indexOf("act=Attach");
		if(k == -1) k = a.indexOf("view=attach");
		if(k != -1 && k > 0 && (a[k-1] == '&' || a[k-1] == '?'))
			l[i].setAttribute("target", "");
	}
})();