// ==UserScript==
// @name           LastFm message box resizer
// @namespace      http://tburny.tb.funpic.de/download/LastFm
// @description    Resizes the New Topic/reply text boxes in last.fm forums
// @include http://*lastfm.*/forum/*
// @include http://*lastfm.*/group/*/forum/*
// @include http://*last.fm/forum/*
// @include http://*last.fm/group/*/forum/*
// ==/UserScript==
GM_log("resizer start");
document.getElementById('editor').style.width = "700px";
document.getElementById('editorTitle').style.width = "700px";
document.getElementById('message').style.width = "700px";
document.getElementById('toolbar').style.width = "700px";
document.getElementById('editorPanel').style.width = "700px";
document.getElementById('editorPreviewContainer').style.width = "700px";
GM_log("resizer_end");