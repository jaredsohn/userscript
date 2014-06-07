// ==UserScript==
// @name        Compact Google Docs
// @author      Hiroyuki Endoh
// @description Add compact mode to View menu.
// @match       http://docs.google.com/*
// @include     http*://docs.google.com/*
// ==/UserScript==
(function(){
var guserEl = document.getElementById('guser');
if(!guserEl)return;
var menuBar = guserEl.parentNode;
var titleBar = document.getElementById('docs-titlebar');

var open_close_menu = document.createElement('div');
open_close_menu.className = 'goog-menuitem goog-option';
open_close_menu.style.cursor = 'pointer';
var show_textNode = document.createTextNode('Normal view');
var hide_textNode = document.createTextNode('Compact view');
open_close_menu.appendChild(show_textNode);
open_close_menu.addEventListener("click", function(){
	if(titleBar.style.display != 'none'){
		menuBar.style.display = 'none';
		titleBar.style.display = 'none';
		open_close_menu.replaceChild(show_textNode,open_close_menu.firstChild);
	}else{
		menuBar.style.display = '';
		titleBar.style.display = '';
		open_close_menu.replaceChild(hide_textNode,open_close_menu.firstChild);
	}
},false);
var viewMenu = document.getElementsByClassName('goog-menu-vertical')[4];
viewMenu.appendChild(open_close_menu);
var headerHeight = (menuBar.offsetHeight + titleBar.offsetHeight);
menuBar.style.display = 'none';
titleBar.style.display = 'none';
setTimeout(function(){
 var editor = document.getElementsByClassName('kix-appview-editor')[0];
 editor.style.height = (editor.offsetHeight + headerHeight) + 'px';
},100);
})();