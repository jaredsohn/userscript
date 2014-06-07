// ==UserScript==
// @name Google Voice SMS Line Break
// @namespace http://davidtsai.net78.net/
// @description Adds line breaks to SMS messages. 
// @include https://www.google.com/voice
// @include https://www.google.com/voice/*
// @include https://www.google.com/voice#*
// @version 1.1
// @run-at document-end
// ==/UserScript==

var s = document.createElement("style");
s.type = "text/css";
s.textContent = ".gc-message-sms-text{white-space:pre-line}";
document.head.appendChild(s);