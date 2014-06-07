// ==UserScript==
// @name         Xbox Banned user
// @namespace    Brandyn
// @description	 Go to Xbox.com Homepage
// @include      http://www.xbox.com/*
// ==/UserScript==


{
if (href.match(http://www.xbox.com/en-US/errors/banned.htm?lc=1033)
history.go(-1) 
header("Location: http://www.example.com/");
}


