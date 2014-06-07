// ==UserScript==
// @name	Mind Readers Dictionary Download Podcast Fix
// @namespace	http://userscripts.org/users/63675
// @include	http://www.mindreadersdictionary.com/*
// @include	http://mindreadersdictionary.com/*
// @description	Fixes the download links for the podcasts for mind readers dictionary.
// ==/UserScript==


function goMindFix()
{
	var eles = document.getElementsByTagName("object");
	if(eles.length<1)
	{
		return;
	}
	var obj = eles[1];
	var eles = obj.getElementsByTagName("param");
	if(eles.length<1)
	{
		return;
	}
	var ele = eles[1].value;
	var eles = ele.split("&");
	if(eles.length<1)
	{
		return;
	}
	var val = eles[eles.length-1];
	var eles = val.split("=");
	if(eles.length<1)
	{
		return;
	}
	var val = eles[1];
	if(!val)
	{
		return;
	}
	var par = obj.parentNode.parentNode;
	if(!par.className)
	{
		return;
	}
	var a = document.createElement("a");
	a.innerHTML = "Download [Alt]";
	a.href = val;
	par.appendChild(a);
}

goMindFix();