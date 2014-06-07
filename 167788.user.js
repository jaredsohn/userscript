// ==UserScript==

// @name           What.CD Freeleech Browser
// @namespace      https://what.cd
// @description    Inserts a freeleech browse link in main menu.  Does not group torrents.
// @include        http://what.cd/*
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @version        1.1
// @date           2013-5-17

// ==/UserScript==



function createLi(x,y) {
	var li = document.createElement('li');
	li.id = 'nav_' + x;
	li.appendChild(y);
	return li;
}
function createFL(x) {
	var a = document.createElement('a');

	a.innerHTML = x;
	a.href = "torrents.php?freetorrent=1&group_results=0&action=advanced&searchsubmit=1";
	return a;
}

var target = document.getElementById('menu').getElementsByTagName('ul')[0];


var free = createFL("Free");
var freeLi = createLi("Free",free);

target.appendChild(freeLi);