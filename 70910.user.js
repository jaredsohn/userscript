// ==UserScript==
// @name           xkcd.com - Hover Text Subtitle and Cleaning
// @description    Displays Comic Mouseover Title Under the Image and Removes the Header and Footer
// @include        http://xkcd.com/*
// @include        http://www.xkcd.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.2
// ==/UserScript==

$(".comicNav:last").before($("#comic img:first").attr("title")+"<br/><br/>");
$("#topContainer, #bottom").remove();