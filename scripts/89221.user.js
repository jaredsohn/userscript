// ==UserScript==

// @name           What.CD Extended Main Menu

// @namespace      http://jonls.dk/

// @description    Insert logchecker and better link in main menu

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// @version        0.2

// @date           2009-04-27

// ==/UserScript==



function createLi(x,y) {
	var li = document.createElement('li');
	li.id = 'nav_' + x;
	li.appendChild(y);
	return li;
}
function createA(x) {
	var a = document.createElement('a');

	a.innerHTML = x;
	a.href = x + ".php";
	return a;
}

var target = document.getElementById('menu').getElementsByTagName('ul')[0];


var better = createA("Better");
var betterLi = createLi("better",better);

var logchecker = createA("Logchecker");
var logcheckerLi = createLi("logchecker",logchecker);
target.appendChild(logcheckerLi);
target.appendChild(betterLi);