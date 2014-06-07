// ==UserScript==
// @name           Add video download link for linux to veoh.
// @namespace      http://ntowa.com
// @description    Requires that you have veoh proxy installed and running.
// @include        http://www.veoh.com/videos/*
// @include        http://veoh.com/videos/*
// ==/UserScript==

var dlopt = document.getElementById('downloadOptions');

var link = '<a href="javascript:document.location=\'http://ntowa.com/scripts/vproxyredir.html?video=\'+escape(window.location);">Download on Linux</a>';

dlopt.innerHTML = link;