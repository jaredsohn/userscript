// ==UserScript==
// @name          BiggerBox
// @namespace     http://ephilei.blogspot.com/
// @include       http://www.google.*/
// @include       http://google.*/
// @include       http://www.google.*/webhp*
// @include       http://google.*/webhp*
// @description	  Expands Google's "more" dropdown box to include more Google services

//Written by JBJ
//September 20, 2006
//jbjjunk@gmail.com
//Used a couple lines from the "Google and Dilbert" script to help get the positioning correct

// ==/UserScript==

var BiggerBox = document.createElement("div"); //Define a div tag where all the new content will reside

BiggerBox.innerHTML = '	' + //The actual new content
	'<div style="position:relative; top:-70px; left:156px;">' +
	'<table border=0 cellspacing=0 cellpadding=4><tr><td nowrap>' +
	'<span  name=more id=more style="display:none;position:absolute;background:#fff;border:1px solid #369;margin:-.5ex 1.5ex;padding:0 0 .5ex .8ex;width:16ex;line-height:1.9;z-index:1001" onclick="stopB(event);">' +
	'<font size=-1>' +
	'<a href=# onclick="return togDisp(event);">'+
		'<img border=0 src=/images/x2.gif width=12 height=12 alt="Close menu" align=right class=cb>' +
	'</a>' +
	'<a class=q href="http://books.google.com/bkshp?hl=en&tab=wp" onClick="return qs(this);">My Books</a>' +
	'<br>' +
	'<a class=q href="http://froogle.google.com/frghp?hl=en&tab=wf" onClick="return qs(this);">Froogle</a>' +

	'<br>' +
	'<a class=q href="http://gmail.google.com/">Gmail</a>' +
	'<br>' +
	'<a class=q href="http://Calendar.google.com/">Calendar</a>' +
	'<br>' +
	'<a class=q href="http://picasaweb.google.com/">Photos</a>' +
	'<br>' +
	'<a class=q href="http://blogspot.com/">Blogger</a>' +
	'<br>' +
	'<a class=q href="http://groups.google.com/grphp?hl=en&tab=wg">Groups</a>' +
	'<br>' +
	'<a href="/intl/en/options/" class=q><b>even more &raquo;</b></a>' +
	'</td></tr></table></font></span>'+
	'</div>';



var f = document.getElementsByTagName("form"); //"Form" is an element used here to know the position of the "more" text
f[0].appendChild(BiggerBox); //append BiggerBox after Form