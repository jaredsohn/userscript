// ==UserScript==
// @name           stagevuLink
// @namespace      #avg
// @description    get video link for stagevu
// @include        http://stagevu.com/video/*
// ==/UserScript==

var link = document.createElement('a');
link.href = document.body.innerHTML.match(/url\[.+'http:.+';/gi)[0];
link.href = link.href.substr(link.href.lastIndexOf('http'));
link.href = link.href.substr(0,link.href.indexOf('.avi')+4);
link.innerHTML = 'Download video';
var linkCover = document.createElement('h1');
linkCover.appendChild(link);
linkCover.setAttribute('align','center');
document.body.insertBefore(linkCover,document.body.firstChild);
