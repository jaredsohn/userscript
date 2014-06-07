// ==UserScript==
// @name           DivxStage Downloader
// @namespace      Aaron Russell
// @description    DivxStage download on video open
// @include        http://www.divxstage.net/video/*
// @include        http://divxstage.net/video/*
// ==/UserScript==

var a = document.createElement('a');
a.setAttribute('href', document.getElementById('embedmvshre').src);
a.appendChild(document.createTextNode('Download Video'));




document.getElementById('videopage_sidebar').appendChild(a);