// ==UserScript==
// @name           Last.fm single submit
// @namespace      http://tburny.tb.funpic.de/download/lastfm
// @include http://*lastfm.*/forum/*
// @include http://*lastfm.*/group/*/forum/*
// @include http://*last.fm/forum/*
// @include http://*last.fm/group/*/forum/*
// ==/UserScript==


//GM_log("Last.fm single submit: launched");
document.getElementById('editorSubmit').addEventListener('click',function(e){document.getElementById('editorSubmit').disabled=true;},false);