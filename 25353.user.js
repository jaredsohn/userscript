// ==UserScript==
// @name           Nexus War www Redirect
// @namespace      http://nw.abnormalcy.org/greasemonkey/
// @description    Redirects nexuswar.com page requests to www.nexuswar.com.
// @include        http://nexuswar.com/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:\/\/nexuswar.com/, 'http://www.nexuswar.com');