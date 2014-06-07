// ==UserScript==
// @name          Cryptic's HF UB3R to L33T
// @namespace     Cryptic/UB3RtoL33T
// @description   Changes the UB3R userbar
// @include       *hackforums.net/member.php*
// @include 	  *hackforums.net/showthread.php*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("ub3r.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/ub3r\.png/g,"http://i.imgur.com/BSHGg.png");
}

if(document.body.innerHTML.indexOf("ub3rstar.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/ub3rstar\.gif/g,"http://i.imgur.com/nPlD3.gif");
}

if(document.body.innerHTML.indexOf("blue_diamond.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/uploads\/awards\/blue_diamond\.png/g,"");
}


