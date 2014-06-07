// ==UserScript==
// @name           Open Source Web Design - Remove Top Frame
// @namespace      http://codr.us
// @description    This removes the frame at the top when you preview designs on oswd.org
// @include        http://www.oswd.org/design/preview/id/*
// ==/UserScript==

var frames = document.getElementsByTagName('frame');
top.location.href = frames[1].src;