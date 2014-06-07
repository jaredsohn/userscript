// ==UserScript==
// @name           Auto Enlarge Manga in Manga Fox
// @namespace      simcop2387
// @description    Automatically makes manga pages fit the browser (by width) for nicer viewing on mangafox.com
// @include        http://www.mangafox.com/page/manga/read/*
// ==/UserScript==
//


	var div = document.getElementById("image_div");
	var page = document.getElementById("image_page");

    var targetWidthd = window.innerWidth-80;
    var targetHeightd = (targetWidthd/div.offsetWidth) * div.offsetHeight;

    var targetWidthp = window.innerWidth-70;
    var targetHeightp = (targetWidthp/page.offsetWidth) * page.offsetHeight;


div.style.width = targetWidthd+"px";
div.style.height = targetHeightd+"px";
page.style.width = targetWidthp+"px";
page.style.height = targetHeightp+"px";
