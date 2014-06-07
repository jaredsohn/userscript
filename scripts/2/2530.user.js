// ==UserScript==
// @name        Slashdot: italics swap, topic skin
// @namespace   
// @description Italics are meant for emphasis, not reading large blocks of text. The i tag distorts the font making it exceptionally ugly. Slashdot should italicize the smaller portions of the text. I also made other aesthetic changes for readability (high-contrast, black-on-white, hurts me emotionally and physically).
// @include     http://slashdot.org/*
// @include     http://*.slashdot.org/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle(

".intro { border: solid thin #bbbbbb; padding: 10px; background-color: #f7f7f7; color: #555555; font-style: italic; line-height: 110%; }" +
".intro a { color: #338833; text-decoration: none; }" +
".intro a:hover { text-decoration: underline; }" +
".intro i { color: #000000; font-style: normal; }" +
".topic img { position: relative; top: -25px; }"

);
