// ==UserScript==
// @name          iwiwE
// @author        Simon Benjamin
// @namespace     http://benjamin.hu/2007/11/15/export-tool-iwiwhu/
// @description   iwiwE menüpont és ismerősök adatainak exportálása
// @include       http://iwiw.hu/pages/*
// @include       http://*.iwiw.hu/pages/*
// @include       http://iwiw.net/pages/*
// @include       http://*.iwiw.net/pages/*
// @include       http://wiw.hu/pages/*
// @include       http://*.wiw.hu/pages/*
// @version       1.6
// ==/UserScript==

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addJavascript(src)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

if (GM_xmlhttpRequest) {
	// iwiwE betoltese
	addJavascript('http://benjamin.hu/projects/iwiw/iwiw_export.js');

	// felso menu
	var headmenu = document.getElementById('headmenu');
	if (headmenu) {
		var li = document.createElement('li');
		li.id = 'hm_iwiwe';
		li.style.borderTop = '4px solid #84954C';
		li.innerHTML = '<a href="#" onclick="iwiwE_init(); return false" style="background-color: #9BBB38;"><span><span>iwiwE</span></span></a>';
		headmenu.firstChild.appendChild(li);
		addGlobalStyle('#hm_iwiwe a:hover { background-color: #8DA543 ! important; }');
	}
	// bal oldali menu (profil / user oldal)
	var leftside = document.getElementById('lm_datasheet');
	if (!leftside) leftside = document.getElementById('lm_basic');
	if (leftside) {
		var li = document.createElement('li');
		li.id = 'lm_iwiwe';
		li.style.borderLeft = '5px solid #9BBB38';
		li.innerHTML = '<a href="#" onclick="iwiwE_init(); return false">iwiwE - Export TOOL</a>';
		leftside.parentNode.appendChild(li);
	}
}
