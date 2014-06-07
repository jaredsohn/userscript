// ==UserScript==
// @name           Github
// @grant          none
// @description    Zmiana download i zip na tar.gz
// @include        https://github.com*
// ==/UserScript==

var hrefOld = $("a[title*='Download']").attr("href");
var titleOld = $("a[title*='Download']").attr("title");
var textOld = $("a[title*='Download']").text();

var hrefNew = hrefOld.replace("zip", "tar.gz");
var titleNew = titleOld.replace("zip", "tar.gz");
var textNew = textOld.replace("ZIP", "tar.gz");
		
$("a[title*='Download']").attr("href", hrefNew).attr("title", titleNew);
$("a[title*='Download']").text(textNew);
