// ==UserScript==
// @name           Remove kompas.com Comments
// @namespace      http://
// @description    Removes all irrelevant, thoughtless and hyprocritical comments (basically all of them) on kompas.com to protect your sanity
// @include        http://*kompas.com/*
// ==/UserScript==

if(document.getElementById("comment_list"))
{
	document.getElementById("comment_list").style.display = "none";
	document.getElementById("comment_paging").style.display = "none";
	document.getElementById("comment_form").style.display = "none";
}