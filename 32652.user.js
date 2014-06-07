// ==UserScript==
// @name          GotVoice - Extract MP3's
// @namespace     http://userscripts.org/users/36992/scripts
// @description   Adds links to the My Messages page and allows you to download your messages as mp3s. You'll have to have the right decoder to play the files.
// @author        Kwame Jeffers aka LordSnooze
// @version       0.02 : 24-Sep-2008
// @include       http://host1.gotvoice.com/messages/*
// ==/UserScript==
/*
Credits
============
(none)
============

About
============
Links are added under the main inputbox
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.02 : 24-Sep-2008 Added logging and updated all hidden documentation.
0.01 : 24-Aug-2008 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
--------------------------------------------------
Sample link to mp3 file...
http://host1.gotvoice.com/msgstore/212123456/2141562369.22050.mp3
============
*/
var newline = ''
var eSettingsDiv = parent.wrappedJSObject.document.getElementsByTagName('td');
var headTag = parent.wrappedJSObject.document.getElementsByTagName('head')[0];
var allLines = headTag.innerHTML.split('\n');
for (var i = 0; i < allLines.length; i++) {
	if (allLines[i].indexOf('MessageStore.messages') > -1) {
		var msg = allLines[i].substring(allLines[i].indexOf('[')+2, allLines[i].indexOf(']')-1 );//crop to 212123456_2151232345
		if (newline !=='') {newline = newline + '<br>'}
		newline = newline + '<a href=http://' + location.hostname + '/msgstore/' + msg.replace("_","/") + '.22050.mp3>' + msg.replace("_","/") + ' </a>'
		}
	}
eSettingsDiv[0].innerHTML= newline