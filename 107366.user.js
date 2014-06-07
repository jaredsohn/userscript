// ==UserScript==
// @name narf
// @include http://narf-archive.com/*
// ==/UserScript==

document.addEventListener('keypress', function(e){
     if (e.keyCode == 39) Archive.Viewer.Clickstream.imageNext();
     if (e.keyCode == 37) Archive.Viewer.Clickstream.imagePrev();
}, false);
