// ==UserScript==
// @name          Cryptic's HF UB3R to Admin
// @namespace     Cryptic/UB3RtoAdmin
// @description   Changes the UB3R userbar
// @include       *hackforums.net/member.php*
// @include 	  *hackforums.net/showthread.php*
// @version 	  1.2
// ==/UserScript==

if(document.body.innerHTML.indexOf("ub3r.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/ub3r\.png/g,"http://i.imgur.com/IWUY6.jpg");
}

if(document.body.innerHTML.indexOf("ub3rstar.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/ub3rstar\.gif/g,"http://i.imgur.com/mU5VN.gif");
}