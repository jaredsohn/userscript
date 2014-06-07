// ==UserScript==
// @name          Cryptic's HF L33T to UB3R
// @namespace     Cryptic/L33TTOUB3R
// @description   Changes the L33T userbar
// @include       *hackforums.net/member.php*
// @include 	  *hackforums.net/showthread.php*
// @version 	  1.1
// ==/UserScript==

if(document.body.innerHTML.indexOf("hf_l33t.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/hf_l33t\.png/g,"http://cdn2.hackforums.net/images/blackreign/groupimages/english/ub3r.png");
}

if(document.body.innerHTML.indexOf("star.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/star\.gif/g,"http://cdn2.hackforums.net/images/blackreign/ub3rstar.gif");
}




