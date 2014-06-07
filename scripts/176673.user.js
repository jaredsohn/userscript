// ==UserScript==
// @name			Don't Panic
// @author			bag-man
// @version			0.1
// @namespace			http://github.com/bag-man/dontpanic
// @src				http://github.com/bag-man/dontpanic
// @description			Changes the Google Logo to the reassuring Don't Panic
// @grant 			none

// @include			https://*.google.*/*
// @include			http://*.google.*/*
// ==/UserScript==

document.getElementById("hplogo").style="background:url(https://raw.github.com/bag-man/dontpanic/master/dontpanic.png) no-repeat;background-size:460 69px;height:69px;width:460px";