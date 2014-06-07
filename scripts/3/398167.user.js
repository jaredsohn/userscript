// ==UserScript==
// @name			MAL Tokisaki "Nightmare" Kurumi Theme [by -Ars-]
// @namespace		http://www.myanimelist.net/profile/http://myanimelist.net/profile/MawaruHime
// @include			http://*myanimelist.net/*
// @exclude			http://*myanimelist.net/animelist/*
// @exclude			http://*myanimelist.net/mangalist/*
// @exclude			http://*myanimelist.net/rss.php*
// ==/UserScript==

//CHANGE BACKGROUNDS HERE
//

// 
bannerbg = "http://i59.tinypic.com/1z6b5fs.jpg";

//
bodybg= "http://i60.tinypic.com/j7w7co.jpg";

//
logobg= "http://i60.tinypic.com/25i2h3s.jpg";



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