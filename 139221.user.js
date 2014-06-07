// ==UserScript==
// @name           Trello : Big Edit
// @author         Justin Kelly http://justin.kelly.org.au @_justin_kelly
// @version        1
// @include        https://trello.com/*
// @include        http://trello.com/*
// ==/UserScript==

cssString = ' '+
	'.window{ '+
	'	left:0px !important; ' +
	'	top:0px !important; ' +
	'	width:100% !important; '+
	'} '+
	' '+
	'.window-main-col '+
	'{ '+
	'	width:80% !important; '+
	'} '+
	'.window-wrapper{ '+
	'	height: 100%; '+
	'} ';



insertCSS(cssString);
// Function to insert CSS
function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}