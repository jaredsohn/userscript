// ==UserScript==
// @name           GTMoveTopHunt.user.js
// @namespace      http://localhost/
// @description    Moves the top-hunt button (and timer) to the top corner of the page.  It is "fixed" at this position, meaning it doesn't scroll.
// @include        http://apps.facebook.com/ghost-trappers/
// @include        http://apps.facebook.com/ghost-trappers/?fb_dash_section=*
// @include        http://apps.facebook.com/ghost-trappers/index.php*
// ==/UserScript==

window.GTMod_MoveTopHunt = function(){
	var oDiv = document.getElementById('app51157989152_tophuntdiv');
	oDiv.style.position = "fixed";
	oDiv.style.top = "0px";
	oDiv.style.left = "-8px";
	oDiv.style.zIndex = 110; // absurdly high zIndex to ensure it is on top
	oDiv.style.border = "solid black 0px";
	oDiv.style.overflow = 'hidden';
	oDiv.style.height = '29px';
}

// actually start delayed a little bit
setTimeout(window.GTMod_MoveTopHunt, 100);

