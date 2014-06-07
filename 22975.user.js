// ==UserScript==
// @name           Remove Y!Shortcuts
// @description    This script removes the Yahoo Shortcuts pup-ups that Yahoo inserts into pages served form their domain, and inserted by wordpress bloggers using the Y!Shortcuts plugin.
// @include        *
// ==/UserScript==
// Creative Commons Attribution-Share Alike 3.0 Unported License
// http://creativecommons.org/licenses/by-sa/3.0/
// bob301
	var yshortremove = document.getElementsByTagName('span');
		if (!yshortremove || yshortremove.length == 0) {
			return;
		}
		 for(var i=0; i<yshortremove.length; i++) {
			var ys = yshortremove[i]; 
			if(ys.className == 'yshortcuts'){
				ys.className = '';
				ys.removeAttribute('id');
			}
		}