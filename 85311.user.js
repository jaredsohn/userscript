// Times of India Clean View
// version 0.0.1BETA
// 2010 SEPTEMBER 03
// Copyright (c) 2010, Ellery Dwayne
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Times of India Clean View
// @namespace     http://www.develtheweb.com/
// @description   Opens article in Printer Friendly view. 
// @include       http://timesofindia.indiatimes.com/*/articleshow/*.cms
// ==/UserScript==
var __body = document.getElementsByTagName('body')[0];
__body.style.backgroundColor = "#222222";
var article = document.getElementById('storydiv').innerHTML;
var _comments = document.getElementById('populatecomment').innerHTML;
var _head = document.getElementsByTagName('h1')[0];
var _parent = _head.parentNode;
var _title = _head.innerHTML;
if(_parent.className != "arttle"){
	_title = document.title;
}
var _body = document.getElementById('netspidersosh');
var _temp = _body.childNodes[1].childNodes[3];
var _container = _temp.childNodes[3];
_body.childNodes[3].innerHTML = "";
_container.innerHTML = "<div style = 'padding: 10px; text-align: justify; font-family:Verdana; font-size:14px'><h1 style='padding: 10px 0 5px 0; font-size:18px; font-weight:normal'>" + _title + "</h1><hr/>" + article + "</div><hr/>" + _comments ;