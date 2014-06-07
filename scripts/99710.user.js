// ==UserScript==
// @name			lazygirls.info Banner Remover
// @author			Hellsing
// @include			http://*lazygirls.*/*
// ==/UserScript==

var tbl = document.getElementById('ad_video_large');
 
tbl.parentNode.removeChild(tbl);