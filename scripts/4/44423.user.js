// ==UserScript==
// @name           ninjavideo.net automatic helper
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    opens the helper automatically in the background
// @include        http://www.ninjavideo.net/*
// @include        http://ninjavideo.net/*
// ==/UserScript==

var link = document.evaluate("//a[contains(@href, 'newWindow')]", document, null, 8, null).singleNodeValue;
link.href = "javascript:void(0);";
link.addEventListener("click", function() {
	GM_openInTab(location.host+"/applet.php");
}, false);
