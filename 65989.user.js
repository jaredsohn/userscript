// ==UserScript==
// @name           Nintendo
// @namespace      chrisch, reaverxai
// @description    Convert NSFW to Nintendo Logo
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var acronyms;

acronyms = document.getElementsByTagName("acronym")

for (i=0;i<acronyms.length;i++) {
	if (acronyms[i].firstChild.data == "NSFW") {
	  acronyms[i].firstChild.data = "Nintendo";
  }
}

addGlobalStyle('li.nsfw-stamp { background-color:#fff; border:2px solid red !important; padding:0 3px 1px 1px; !important; margin: 1px;}');