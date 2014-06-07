// ==UserScript==
// @name        ZR Archive
// @namespace   Ru.Zr.Archive
// @description Shows archived issue on one page
// @include      /^http:\/\/(www\.)?zr\.ru\/archive\/zr\/\d{4}\/\d{2}$/
// @version     1.0
// ==/UserScript==
var lazyImages = document.getElementsByTagName("IMG");
var lazyImage;
var reg = /^http:\/\/www\.zr\.ru\/archive\/image\/preview\/(.+?)\d+$/
var pageText = new Array("");
var imageFound = false;
for (var i = 0; (lazyImage = lazyImages[i]) != null; ++i)
    if (lazyImage.className && lazyImage.className == "lazy") {
        var hrefData = lazyImage.getAttribute("data-href");
        var replaced = hrefData.replace(reg, "http://www.zr.ru/archive/image/crop/$1");
        pageText.push("<p><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td><img src=\"" + replaced + "1280/0\" /></td>");
        pageText.push("<td><img src=\"" + replaced + "1280/1\" /></td></tr>");
        pageText.push("<tr><td><img src=\"" + replaced + "1280/2\" /></td>");
        pageText.push("<td><img src=\"" + replaced + "1280/3\" /></td></tr></table></p>");
        imageFound = true;
    }
if (imageFound)
	document.body.innerHTML = pageText.join("");