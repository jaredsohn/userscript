// ==UserScript==
// Coded by ecmanaut from freenode by request of kwyjibo
// Uploaded with permission.
// @name           Dim Image Tags
// @namespace      codedby-ecmanaut-freenode
// @description    Dim Foreground Images to 50% Opacity. Easy on the eyes. Adjust value between 0.1 and 1.0
// ==/UserScript==

[].slice.call(document.images).map(function(i){i.style.opacity = "0.5";})
