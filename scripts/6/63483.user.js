// ==UserScript==
// @name           Honest Twitter Prompt
// @namespace      everythingisthebest
// @description    Change the "What's happening?" prompt on Twitter to be more honest.
// @include        http://*.twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

document.getElementsByClassName('doing')[0].innerHTML = "Say something clever enough, <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and maybe someone will love you.";