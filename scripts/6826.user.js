// Magic Logout
// Version 0.0.1
// 20-12-2006
//
//
// ==UserScript==
// @name Logout
// @Description Logout as soon as you login.
// @include http://www.orkut.com/*
// @exclude https://www.orkut.com/GLogin.aspx*
// ==/UserScript==

var s = document.createElement("script");
s.innerHTML = "window.location='https://www.orkut.com/GLogin.aspx?cmd=logout';";
document.body.appendChild(s);
