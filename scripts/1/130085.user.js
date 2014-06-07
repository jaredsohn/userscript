// ==UserScript==
// @name           Coursera forum title fix
// @namespace      Maxim.Yanchenko
// @include        https://class.coursera.org/*/forum/thread?*
// ==/UserScript==

var rr=/\s*(.*)<\/a> . (.*)<\/h1>/.exec(document.body.innerHTML);
document.title = rr[2]+" ["+rr[1]+"]";