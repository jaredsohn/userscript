// ==UserScript==
// @name           Spymaster Instant Assassination.
// @namespace      bobthecow
// @description    Skip the Spymaster "assassination progress" screen.
// @include        http://playspymaster.com/assassination/progress/*
// ==/UserScript==

window.location.href = window.location.href.replace(/\/progress\//,'/results/');