// ==UserScript==
// @name           TEst
// @namespace      http://userscripts.org/scripts/source/40031.user.js
// @include        http://www.stripesframework.org/*
// ==/UserScript==

var tags = document.getElementsByTagName('p');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="georgia";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="16";
}


var tags = document.getElementsByTagName('li');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="georgia";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="16";
}


var tags = document.getElementsByTagName('h1');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="gill sans ultra bold";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="30";
}
var tags = document.getElementsByTagName('h2');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="gill sans ultra bold";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="25";
}
var tags = document.getElementsByTagName('h3');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="gill sans";
	tags[i].style.fontWeight="bold";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="22";
}

var wiki = document.getElementsByClassName('wiki-content')[0];
wiki.style.marginLeft="30px";
wiki.style.width="80%";