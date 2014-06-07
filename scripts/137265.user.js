// ==UserScript==
// @name          Legit hecks
// @namespace     Man
// @description   MAgic
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==


if(document.body.innerHTML.indexOf("hf_l33t.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\/groupimages\/english\/hf_l33t\.png/g,"http://i.imgur.com/BMH35.png");
}

if(document.body.innerHTML.indexOf("star.gif") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace(/http\:\/\/cdn2\.hackforums\.net\/images\/blackreign\star\.gif/g,"http://cdn2.hackforums.net/images/blackreign/staff_star.png");
}

