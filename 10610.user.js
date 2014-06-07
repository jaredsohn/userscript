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
	button.setAttribute('style', 'background: url("http://i156.photobucket.com/albums/t4/nick_caskey9/XXX.png");\
	background-position:center!important; background-repeat:no-repeat!important;\
	border: 0px; position:absolute;z-index:9;right:5px;top:5px;');
	button.setAttribute('onclick', "var s=document.getElementsByTagName('style');\
	s[0].innerHTML=''; s[1].innerHTML=''; s[2].innerHTML=''; s[3].innerHTML='';\
	s[4].innerHTML=''; s[5].innerHTML=''; s[6].innerHTML=''; s[7].innerHTML='';\
	s[8].innerHTML=''; s[9].innerHTML=''; s[10].innerHTML='';\
	var b=document.getElementsByTagName('button')[0];\
	b.parentNode.removeChild(b);");
	target.parentNode.insertBefore(button, target.nextSibling);

    }