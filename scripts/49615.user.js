// ==UserScript==
// @name           Clean (lab osv)
// @namespace      http://userscripts.org/scripts/source/49615.user.js
// ==/UserScript==


var tags = document.getElementsByTagName('p');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="baskerville";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="16";
}


var tags = document.getElementsByTagName('li');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="baskerville";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="16";
}


var tags = document.getElementsByTagName('h1');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="gill sans";
	tags[i].style.fontWeight="bold";
	tags[i].style.lineHeight="1.5";
	tags[i].style.fontSize="30";
}
var tags = document.getElementsByTagName('h2');
for(var i = 0; i < tags.length; i++){
	tags[i].style.fontFamily="gill sans";
	tags[i].style.fontWeight="bold";
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

var tags = document.getElementsByTagName('body');
for(var i = 0; i < tags.length; i++){
	tags[i].style.width = "500px";
}
