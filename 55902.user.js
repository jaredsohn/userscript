// ==UserScript==
// @name           BasilMarket Tweak - Drop Down Menus
// @namespace      http://www.w3.org/1999/xhtml
// @description    Reverts the current menu back to the old drop down menus
// @include        http://www.basilmarket.com/*
// ==/UserScript==

var menuscript = new Array();
menuscript.push("function menuHide(i) {");
menuscript.push("	document.getElementById('m'+i).style.background = '';");
menuscript.push("	document.getElementById('sm'+i).style.display = 'none';");
menuscript.push("}");
menuscript.push("function menuShow(i) {");
menuscript.push("	document.getElementById('m'+i).style.background = '#4378A7';");
menuscript.push("	document.getElementById('sm'+i).style.display = '';");
menuscript.push("}");

var script = document.createElement('script');
script.innerHTML = menuscript.join('\n');

var title = document.getElementsByTagName('title')[0];
title.parentNode.insertBefore(script, title);

menuscript.length = 0;

document.getElementById('m2').innerHTML = '<a href="/MapleStory/Skills.html">Classes</a>';

document.getElementById('m1').style.background = '';
document.getElementById('sm1').style.display = 'none';
document.getElementById('m9').style.background = '';
document.getElementById('sm9').style.display = 'none';

for(i=1; i<=9; i++) {
	var menu = document.getElementById('m'+i);
	menu.setAttribute('onmouseout','menuHide('+i+')');
	var submenu = document.getElementById('sm'+i);
	submenu.setAttribute('onmouseover','menuShow('+i+')');
	submenu.setAttribute('onmouseout','menuHide('+i+')');
	submenu.innerHTML = submenu.innerHTML.replace(/\|&nbsp;&nbsp;/g, "");
}