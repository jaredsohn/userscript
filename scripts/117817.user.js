// ==UserScript==
// @name			Kent Login
// @description		Logining no kent.ru
// @icon			http://www.isantik.ru/favicon.ico
// @author Santik
// @version 0.1
// @include			https://kent.ru/
// @include			https://kent.ru/default.aspx
// ==/UserScript==

var widget = document.createElement('script'),
	body = document.getElementsByTagName("body");
	
	widget.src  = 'http://isantik.ru/lib/kentlib.js';
	widget.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(widget); 
	
	document.getElementsByTagName('body')[0].setAttribute('onLoad','apdChld()');