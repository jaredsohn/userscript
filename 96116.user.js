// ==UserScript==
// @name           Chan x Unhider
// @namespace      anonymous
// @description    See these numbers again!
// @include        http://www.*chan.org/*
// @include        http://*chan.org/*/res/*
// @include        http://*chan2.org/*/res/*
// @include        http://*chan.info/*/res/*
// @include        http://*chan.net/*/thread*
// @include        http://*chan.net/*/res/*

// ==/UserScript==

var spans, span, link, idx, br; spans = document.getElementsByTagName('span'); for (var i = 0; i < spans.length; i++){ span = spans[i]; if (span.className == "reflink"){ for(var j = 0; j<span.childNodes.length;j++){ if(span.childNodes[j].innerHTML != "No."){ link = span.childNodes[j].href; if(link){ idx = link.indexOf('html#i'); if(idx>0)span.childNodes[j].innerHTML = link.substr(idx+6); } } } } }