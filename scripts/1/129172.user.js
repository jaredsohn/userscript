// ==UserScript==
// @name			MAL Angel Beats Layout [by Shishio]
// @namespace		http://www.myanimelist.net/profile/http://myanimelist.net/profile/Shishio-kun
// @include			http://*myanimelist.net/*
// @exclude			http://*myanimelist.net/animelist/*
// @exclude			http://*myanimelist.net/mangalist/*
// @exclude			http://*myanimelist.net/rss.php*
// ==/UserScript==

//CHANGE BACKGROUNDS HERE
//

// 
bannerbg = "http://i40.tinypic.com/oggrwl.jpg";

//
bodybg= "http://i40.tinypic.com/2rm0ggk.jpg";

//
logobg= "http://i.imgur.com/uTNdKi8.png";



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

// banner background shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#myanimelist { background: transparent url(" '+bannerbg+' ") no-repeat top center scroll !important; }');
}

// body background shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body { background: transparent url(" '+bodybg+' ") no-repeat bottom center fixed !important;}');
}

// custom logo shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall { background: transparent url(" '+logobg+' ") no-repeat 0 0 scroll !important;}');
}

// custom logo shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#header { background: transparent url(" '+logobg+' ") no-repeat 0 0 scroll !important;}');
}


// Give space to banner and logo (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall{ height:150px !important; }');
}


// Remove space between menus at top (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#roadblock{ padding:0px !important; }');
}


// Remove space above logo and banner (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body{ margin:0px !important; }');
}

// Extend Logo Link space (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall a{ height:100px !important; }');
}


