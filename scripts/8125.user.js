// 
// ==UserScript==
// @name           Remove MySpace Styles Button
// @description    Adds a button to remove styles from MySpace pages
// @include        *myspace.com*
// ==/UserScript==

var target = document.getElementById('tipDiv');

if (target) 

    {

	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Style Off');
	button.setAttribute('style', 'background: darkgray; border-bottom: 2px solid gray;\
	border-left: 2px solid lightgray; border-right: 2px solid gray;\
	border-top: 2px solid lightgray; color: black; cursor: pointer; font: bold 8pt arial, sans-serif;\
	margin: 5px 0 0 50%; z-index: 999;');
	button.setAttribute('onclick', "var s=document.getElementsByTagName('style');\
	s[0].innerHTML=''; s[1].innerHTML=''; s[2].innerHTML=''; s[3].innerHTML='';\
	s[4].innerHTML=''; s[5].innerHTML=''; s[6].innerHTML=''; s[7].innerHTML='';\
	s[8].innerHTML=''; s[9].innerHTML=''; s[10].innerHTML='';\
	var b=document.getElementsByTagName('button')[0];\
	b.parentNode.removeChild(b);");
	target.parentNode.insertBefore(button, target.nextSibling);

    }