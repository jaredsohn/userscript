// ==UserScript==
// @name           Battlecam Block Situation
// @namespace      w
// @description    Stops the Situation Video from playing
// @include        http://battlecam.com/
// @include         http://www.battlecam.com/
// @include        http://battlecam.com/channels
// @include        http://www.battlecam.com/channels
// ==/UserScript==

divs = document.getElementsByTagName("div");
for (i in divs) {
	id=divs[i].id;
	if (id && id.search(/install_video_\d+_here/) != -1) { divs[i].parentNode.removeChild(divs[i]);break;}
	}
