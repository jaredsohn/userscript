// ==UserScript==
// @name           Gmail Sidebar Scratchpad *testing*
// @description    Puts a scratchpad on the right-hand side of the gmail compose window   
// @author         nirrek (http://userscripts.org/users/465714) 
// @version        1.0
// @include        https://mail.google.com*

//
// ==/UserScript==
	
document.getElementById(':rq').style.backgroundColor = '#ff0000';

var sidebar_parent = document.getElementsByClassName("anT")[0];
alert(sidebar_parent);