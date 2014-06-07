// ==UserScript==
// @name           searchFTPs.com - Directory Browser
// @namespace      http://userscripts.org/users/33073/scripts
// @description    If you click a link using FireFTP, you'll be able to browse the directory of the given file instead of downloading the file rightaway. Also, the maximum possible amount of results will be selected.
// @include        http://www.searchftps.com/*
// @include        http://www.search-ftps.com/*
// @include        http://searchftps.com/*
// @include        http://search-ftps.com/*
// ==/UserScript==



var links = document.evaluate("//a[starts-with(@href, 'ftp://')]", document, null, 6, null);
for (var i=0; i<links.snapshotLength; i++) {
	var link = links.snapshotItem(i);
	link.href = link.href.substring(0, link.href.lastIndexOf("/")+1);
}

var count = document.getElementById("ctl00_MainContent_SearchFilesPerPageDropDownList");
if (count) {
	var options = count.getElementsByTagName("option");
	count.value = options[options.length-1].value;
}