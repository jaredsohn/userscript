// ==UserScript==
// @name           dalink.us fast redirect
// @namespace      ch.cimnine.dalink
// @include        http://*dalink.us/*
// ==/UserScript==
var strloc = window.location.href;
window.location = strloc.substr(strloc.indexOf("?")+1);