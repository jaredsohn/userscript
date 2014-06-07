// ==UserScript==
// @name Hacker News No Scribd
// @description No, I don't want no scribd... replace it with Google Docs.
// @namespace http://www.red-bean.com/decklin/userscripts/
// @include http://news.ycombinator.com/*
// ==/UserScript==

function snap(r,p) { return document.evaluate(p, r, null, 7, null) }
function smap(s,f) { for (var i=0;i<s.snapshotLength;i++) f(s.snapshotItem(i)) }

var scribdBase = 'http://www.scribd.com/vacuum';
var googleBase = 'http://docs.google.com/viewer';
var scribdPath = '//a[starts-with(@href, "' + scribdBase + '")]';

smap(snap(document, scribdPath), function(scribdAnchor) {
    var googleAnchor = document.createElement('a');
    googleAnchor.href = scribdAnchor.href.replace(scribdBase, googleBase);
    googleAnchor.appendChild(document.createTextNode('google'));
    scribdAnchor.parentNode.replaceChild(googleAnchor, scribdAnchor);
});
