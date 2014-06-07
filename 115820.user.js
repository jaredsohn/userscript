// ==UserScript==
// @name           ulozto minimize ui
// @namespace      daemonicky
// @include        http://www.uloz.to/hledej/*
// @include        http://www.ulozto.cz/hledej/*
// @include        http://ulozto.cz/hledej/*
// @include        http://www.ulozto.sk/hledej/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//$("div[id=upper_menu]").html("");
//$("div[id=header]").html("");
$("div[id=content]").insertBefore($("div[id=wrap]"));
$("div[id=master]").html("");
$("div[id=content]").css("background-color","white");
/*$("body").css("background","");
$("body").css("filemanager.background","");
$("div[id=header]").css("background","");
$("*").css("background-image","");
$("*").css("background","");
*///background
//$("p[class=numfiles]").html("");