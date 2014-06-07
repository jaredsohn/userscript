// ==UserScript==// @name		No more helena// @namespace	tag:gordon.barber@gmail.com,2005-11-13:NayHelena// @description	Nay with Helena is just creepy// @include		http://ceepig.homeip.net/naytest.html
// ==/UserScript==
var images = document.getElementsByTagName("img");images[1].style.visible = false;