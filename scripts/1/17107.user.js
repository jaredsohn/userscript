// ==UserScript==
// @name           Science access from Cambridge
// @namespace      geological-supplies.com
// @description    Accesses post-2002 issues of "Science". Raven login requred.
// @include        http://www.sciencemag.org/cgi/content/full/*
// @version 0.1    untested
// ==/UserScript==

getnos = /http:\/\/www\.sciencemag\.org\/cgi\/content\/full\/(\d{3})\/\d{4}\/(\d*)/
nos = window.location.href.match(getnos);
if (nos[1]>250) window.location.href = "http://linux02.lib.cam.ac.uk:2306/cgi/search?volume=" + nos[1] + "&firstpage=" + nos[2];