// ==UserScript==
// @name           DraftBlogger
// @namespace      tampabill92@gmail.com
// @description    Re-direct to Blogger in Draft from regular Blogger Dashboard
// @include        http://www.blogger.com/*
// ==/UserScript==

var currURI = document.location.href;
var postDomainURI = currURI.substring(currURI.indexOf("/", 7)+1);
var newURI = "http://draft.blogger.com/" + postDomainURI;
document.location.href = newURI;