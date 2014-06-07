// ==UserScript==
// @name			MAL Overlay fix [by Shishio]
// @namespace		http://myanimelist.net/profile/Shishio-kun
// @include			http://*myanimelist.net/*
// @exclude			http://*myanimelist.net/rss.php*
// ==/UserScript==





// CSS
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

// overlay fix (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('@import "https://googledrive.com/host/0BxjwQr0BBXs-d3FsNkY4amVQU0U";');}