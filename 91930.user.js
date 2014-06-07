// ==UserScript==
// @name           O2 Online (Ireland) Auto Login
// @description    Automatically clicks the "Go" button when it logs you out.
// @include        http://www.o2online.ie/idm/*
// @include        https://www.o2online.ie/idm/*
// @include        http://messaging.o2online.ie*
// @version        2.0
// ==/UserScript==

buttonGo = document.getElementsByName('submitButton')[0];
var A = document.createEvent("MouseEvents");
A.initEvent("click", true, true);
buttonGo.dispatchEvent(A);