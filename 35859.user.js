// ==UserScript==
// @name           JIRA Quick Search Submit Button
// @namespace      http://mailerdaemon.home.comcast.net
// @description    Really useful when used in conjunction with SubmitToTab
// @include        */jira.*
// @include        */jira/*
// @include        *.jira.*
// ==/UserScript==

if(form = document.forms.namedItem("quicksearch"))
{
	span = document.createElement("span");
	span.className="navItem";
	span.innerHTML = "<input type='submit' name='submit' value='S' class='quickSearchInput'/>";
	form.appendChild(span);
}