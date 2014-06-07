// ==UserScript==
// @name       Change CSS for regexcrosswords
// @version    1.0
// @description  enter something useful
// @match      http://regexcrossword.com/challenges/*
// @copyright  2013+, Fernando Xavier de Freitas Crespo
// ==/UserScript==

function addCss(cssString) { 
	var head = document.getElementsByTagName('head')[0];

    if (!head) {
		return;
	}
	var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
} 
addCss ( 
    '.crossword table thead span, .crossword table tfoot span { -webkit-transform: translate(-90px,-90px) rotate(45deg) ! important;}' 
);
