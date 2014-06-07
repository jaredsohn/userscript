// ==UserScript==
// @name Google Voice Mobile SMS Line Break
// @namespace http://davidtsai.net78.net/
// @description Adds line breaks to SMS messages on the Google Voice Mobile site
// @include https://www.google.com/voice/m
// @include https://www.google.com/voice/m/*
// @version 1.1
// @run-at document-end
// ==/UserScript==

s = document.createElement("style");
s.type = "text/css";
s.textContent = ".mr .ms3 .sf + span{white-space:pre-line}";
document.head.appendChild(s);