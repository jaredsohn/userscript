// JavaScript Document
// ==UserScript==
// @name           Membana cool comment
// @author         Author
// @namespace      Membana
// @description    Membana cool comment
// @include        http://*.membrana.ru/*
// @version        0.01
// ==/UserScript==

var exec = false;

var w = window.wrappedJSObject || window;

w.addEventListener('DOMContentLoaded', repairComment, true);
w.addEventListener('load', repairComment, true);

function repairComment()
{
	if (exec)  
		return;

	exec = true;

	var awrapper = document.getElementsByClassName("a-wrapper");
	var awrapperi = document.getElementsByClassName("a-wrapper-i");
	var awrapperii = document.getElementsByClassName("a-wrapper-ii");
	var abody = document.getElementsByClassName("a-body");

	var acomments = document.getElementsByClassName("a-comments");

	awrapper[0].style.backgroundImage = "url(/images/bg-content.png)";
	awrapper[0].style.clear = "both";
	
	awrapperi[0].style.backgroundImage = "url(/images/bg-content.png)";
	awrapperii[0].style.backgroundImage = "url(/images/bg-content.png)";	

	abody[0].style.width = "700px";
	abody[0].style.float = "none";
	abody[0].style.clear = "both";
	abody[0].style.opacity = 1;
	
	acomments[0].style.clear = "both";
	acomments[0].style.float = "none";
	acomments[0].setAttribute('data-toggle', '');
	acomments[0].style.width = "700px";
	acomments[0].style.opacity = 1;
}
