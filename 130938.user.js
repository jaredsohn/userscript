// ==UserScript==
// @name           Productivity Improver
// @namespace      userscripts.org
// @description    Improves productivity.
// @include        http*://reddit.com/*
// @include        http*://*.reddit.com/*
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://facepunch.com/*
// @include        http*://*.facepunch.com/*
// @include        http*://tumblr.com/*
// @include        http*://*.tumblr.com/*
// @include        http*://youtube.com/*
// @include        http*://*.youtube.com/*
// @include        http*://vimeo.com/*
// @include        http*://*.vimeo.com/*
// ==/UserScript==

var body = document.getElementsByTagName( "body" )[0];
body.innerHTML = "";
document.getElementsByTagName( "head" )[0].innerHTML = "";
body.style.margin = "0";
body.style.padding = "0";
window.location.replace("http://heyyeyaaeyaaaeyaeyaa.com/");