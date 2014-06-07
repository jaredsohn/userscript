// ==UserScript==
// @name           Nintendo
// @namespace      chrisch
// @description    Convert NSFW to Nintendo
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==


var acronyms;

acronyms = document.getElementsByTagName("acronym")
GM_addStyle("li.nsfw-stamp { background-color:white;}");
GM_addStyle(".nsfw-stamp acronym { color:red; font-weight:bold;}");




for (i=0;i<acronyms.length;i++) {
	if (acronyms[i].firstChild.data == "NSFW") {
	  acronyms[i].firstChild.data = "Nintendo";
  }
}