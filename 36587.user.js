// ==UserScript==
// @name           GuardianDeCommenter
// @namespace      localhost
// @description    Load all comments on single page on clicking the Guardian cricket blogs
// @include        http://www.guardian.co.uk/sport/*
// @exclude        http://www.guardian.co.uk/sport/cricket*
// @exclude        *?showallcomments=true
// @exclude	*?commentpage=*
// ==/UserScript==


var url = window.location.href;
url += "?showallcomments=true";
window.location.replace(url);

