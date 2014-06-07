// ==UserScript==
// @name          test
// @namespace     test
// @description   this si test
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("Skelle") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace("http://cdn2.hackforums.net/images/blackreign/groupimages/english/hf_l33t.png", "http://cdn2.hackforums.net/images/blackreign/groupimages/english/super_moderator.png");

document.body.innerHTML.replace("http://cdn2.hackforums.net/images/blackreign/star.gif", "http://cdn2.hackforums.net/images/blackreign/staff_star.png");

document.body.innerHTML.replace("<spam style="color:#ffcc00">Skelle</span>", "<span style="color: #00FF00;"><strong>Skelle</strong></span>");
}