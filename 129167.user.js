// ==UserScript==
// @name			MAL 1366px Miku/Horo Theme [by Shishio]
// @namespace		http://www.myanimelist.net/profile/http://myanimelist.net/profile/Shishio-kun
// @include			http://*myanimelist.net/*
// @exclude			http://*myanimelist.net/animelist/*
// @exclude			http://*myanimelist.net/mangalist/*
// @exclude			http://*myanimelist.net/rss.php*
// ==/UserScript==


// 
bodybg = "http://i40.tinypic.com/32zkefb.jpg";


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

// background shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body { background: transparent url(" '+bodybg+' ") no-repeat top center fixed !important; z-index: 1 !important;}');
}


// Remove MAL Logo (optional)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall{ display: none !important; }');
}

// Lower MAL menu from top (optional)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#menu{ margin-top:40px !important; }');
}

// Remove space between menus at top (optional)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#roadblock{ padding:0px !important; }');
}