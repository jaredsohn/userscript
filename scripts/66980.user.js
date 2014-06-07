// ==UserScript==
// @name            4Chan channel name customizer
// @description     Changes (EG) /g/ - Technology to /g/ - Rainbow butt monkeys
// @copyright       2009+, german
// @license         Public Domain
// @version         0.0.1
// @date            2010-01-22
// @include         http://boards.4chan.org/*
// ==/UserScript==

var Script = {
	name: '4Chan channel name customizer',
	version:	'0.0.1',
	id:		-1
};

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {//chrome compat
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

function x(xpath, root) {
	if (!root) root = document.body;
	return document.evaluate(xpath, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function X(xpath, root) {
	if (!root) root = document.body;
	var result = document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var a = [], item;
	while (item = result.iterateNext())
		a.push(item);
	return a;
}

var board = /boards\.4chan\.org\/([^\/]+)\//.exec(window.location.href)[1];
var header = x("./div[@class='logo']/font[@size='5']/b/span");
var boardLinks = X("./div[@id='header']/span[@id='navtop']/a");
var titleStr = GM_getValue("title_" + board, header.innerHTML);

setBoardTitle(titleStr);
for(var i=0; i<boardLinks.length; i++) {
	var boardName = boardLinks[i].innerHTML;
	boardLinks[i].title = GM_getValue("title_" + boardName, boardLinks[i].title);
}

header.style.cursor = "pointer";
header.addEventListener("click", showEditor, false);

function showEditor() {
	var text = header.innerHTML;
	var input = document.createElement("input");
	input.type = "text";
	input.value = text;
	input.style.width = "200px";
	input.style.fontSize = "18pt";
	input.style.fontWeight = "bold";
	
	header.innerHTML = "";
	header.appendChild(input);
	
	input.onblur = function(e) {
		GM_setValue("title_" + board, input.value);
		setBoardTitle(input.value);
	}
	input.focus();
}

function setBoardTitle(text) {
	document.title = text;
	header.innerHTML = text;
	x("./div[@id='header']/span[@id='navtop']/a[text()='" + board + "']").title = text;
}
