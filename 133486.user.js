// ==UserScript==
// @name        Google Reader Readable
// @namespace   http://userscripts.org/users/Feng Ya - G
// @description Change the original display of Google Reader, e.g. increase the font size, making it more readable
// @include     http://www.google.com/reader/*
// @include     https://www.google.com/reader/*
// @version     1.0.1
// ==/UserScript==

// General function to add CSS style
function addStyle(css) {
	var container,style;
	// Element that I want to change
	container = document.getElementById('viewer-container');
	style = document.createElement('style');
	style.tpye = 'text/css';
	style.innerHTML = css;
	container.appendChild(style);
}

// CSS used to change the font (size and family)
var cssFont;
cssFont = '#viewer-container {font-size: 150%; font-family: verdana, "Times New Roman";}';
// Add CSS style to Google Reader
addStyle(cssFont);