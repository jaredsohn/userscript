// clalit! nisayon user script
// version 0.1 BETA!
// 19 in kislev 5768
// Copyright (c) 5768, y.s.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           כללית
// @namespace      https://e-services.clalit.org.il/*
// @description    ניסיון לתיקון אתר "כללית שירותים אונליין" (לבינתיים תוקן רק התפריט)
// @include        https://e-services.clalit.org.il/*
// ==/UserScript==

window.addEventListener(
    'load', 
    function() {var URLscript=document.createTextNode('openURL=function openURL(url,target)' +
'{' +
	'var iframe = document.getElementById("main");' +
	'var vv=document.getElementById("tbmain");' +
	'if (target=="2")	{' +
		'window.open(url,null,"height=10,width=10,status=no,toolbar=no,menubar=no,location=no;directories=no;resizable=no;scrollbars=no;titlebar=no;top=0;");' +
	'}' +
	'else if (target=="1")	{' +
		'window.open(url,null);' +
	'}' +
	'else if	(target=="")	{' +
		'eval(url);' +
		'iframe.height="100%";' +
	'}' +
	'else	{' +
	'iframe.height=hightW;' +
	'vv.style.height=hightW;' +
		'eval(target+"='+"'"+'"+url+"'+"'"+'");' +
	'}' +
'}');
var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','Ujs');
	document.body.appendChild(Uscript);
document.getElementById('Ujs').appendChild(URLscript);},
    true);
