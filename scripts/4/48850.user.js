// ==UserScript==
// @name           Auto-submit MSU's netid form
// @namespace      Peter Rifel
// @description    NOTE: You must have your login info saved in your browser's forms fields!
// @include        https://*.msu.edu/*
// @include        http://*.msu.edu/*
// ==/UserScript==

var url = window.location.host;

if (url == 'mail.msu.edu') 
{
	document.getElementById('imp_login').submit();
}
	
if (url == 'login.msu.edu' || url == 'stuinfo.msu.edu' || url == 'controller.wireless.msu.edu') 
{
	var forms, thisform;
	forms = document.evaluate(
    	"//form[@name='formLogin']",
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	for (var i = 0; i < forms.snapshotLength; i++) 
	{
    	thisform = forms.snapshotItem(i);
    	thisform.submit();
	}
}