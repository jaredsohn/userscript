// ==UserScript==
// @name           SiMplify MEGAUPLOAD
// @namespace      http://userscripts.org/scripts/show/46490
// @description    Easily Download From MegaUpload, Remove The Timer & Automatically Download The Link, Works Great On New Layout
// @include        http://www.megaupload.com/*
// ==/UserScript==

var state = document.body.innerHTML.indexOf('Enter this');

if (state == -1) {
	document.getElementById('downloadlink').style.display = '';
	document.getElementById('downloadcounter').style.display = 'none';
	window.location = document.getElementById('downloadlink').firstChild.getAttribute('href');
}