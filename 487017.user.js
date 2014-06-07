// ==UserScript==
// @name           crashlytics-stacktrace-devmode
// @namespace      crashlytics-stacktrace-devmode
// @author         Danny Hvam
// @description    This will make the pretty-print of stacktraces more developer friendly
// @version        0.1
// @include        https://*.crashlytics.com/*
// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML += ".title { color: #101010; } ";
style.innerHTML += "::-webkit-selection{ background-color: #459cc5; color: #ffffff }::-moz-selection { background-color: #459cc5; color: #ffffff; }::selection{ background-color: #459cc5; color: #ffffff }";
style.innerHTML += ".stack-frames { font-size: 1em; } ";
style.innerHTML += ".stack-frame { font-family: monospace; font-weight: normal; letter-spacing: 0px; color: #787878; } ";
style.innerHTML += ".stack-frame .frame-code { padding: 3px; word-wrap: break-word; } ";
style.innerHTML += ".stack-frame.highlighted { color: #787878; } ";
style.innerHTML += ".stack-frame.highlighted.developer-code { color: #000000; } ";
style.innerHTML += ".stack-frame.starred.developer-code { background-color: rgba(255, 0, 0, 1); color: rgba(255, 255, 255, 1); } ";
head.appendChild(style);
