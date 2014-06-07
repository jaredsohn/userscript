// ==UserScript==
// @name       	Facepunch GD unshitter
// @namespace  	http://scrap.tf
// @version     1.0
// @description Fixes garry's "real forum"
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      	http://facepunch.com/*
// @copyright   2013+, Geel9
// ==/UserScript==

$(function(){
    $("a[href='forumdisplay.php?f=6']").attr("href", "forumdisplay.php?f=6&sort=lastpost&order=desc");
});