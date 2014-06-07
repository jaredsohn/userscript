// ==UserScript==
// @name            Google Logo
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     "Included pages" will get google logo.
// @include         http://www.google.com.pk/*
// ==/UserScript==


if(document.getElementById('logo'))
{
	document.getElementById('logo').style.width = "294px";
	document.getElementById('logo').style.height = "89px";
    document.getElementById('logo').style.background = "url(http://projects.ire-s.com/AdGulfPortal/images/logo.gif)";
document.getElementById('logo').src = "http://projects.ire-s.com/AdGulfPortal/images/logo.gif";

window.status = "hello status";
    
}