// #########################    A simple Greasemonkey script that
// # Restore Google Colors #    makes Google Search page colors less bright.
// #########################    
// 
// --------------------------------------------------------------------
// 
//  This is a Greasemonkey user script. To install this script, you
//  need Greasemonkey version 0.3 or later. To get Greasemonkey, or
//  for more information go to http://greasemonkey.mozdev.org/
//  Greasemonkey is a Mozilla Firefox add-on that allows users to
//  make on-the-fly changes to HTML web page content through the use
//  of JavaScript. Greasemonkey scripts can add new functions to web
//  pages, fix rendering bugs, combine data from multiple webpages,
//  or perform numerous other functions.
// 
// --------------------------------------------------------------------
// 
// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Less bright Google Search Colors
// @namespace     http://alexeypegov.com/
// @description   Makes Google Search colors less bright
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// @exclude       
// @version       1.2
// @history       1.2  Fixed styles to cover more elements
// @history       1.1  Slightly modified color scheme
// @history       1.0  Initial release
// ==/UserScript==
// ####################################################################

GM_log('Google Search Colors GreaseMonkey Script Loaded');

function addStyle(newStyle) {
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

addStyle(
  '#search > #ires > ol > li h3.r a {'
    + 'color: #2a1fbb;'
    + '}'
    + '#search > #ires > ol > li h3.r a:visited {'
    + 'color: #551A8B;'
    + '}'
    + '#foot.tsf-p a {'
    + 'color: #2a1fbb;'
    + '}'
    + '#foot.tsf-p a:visited {'
    + 'color: #551A8B;'
    + '}'
    + '#search > #ires > ol > li > div > div > div.f.kv cite {'
    + 'color: #226d06;'
    + '}'
    + '#search > #ires > ol > li > div > div > div.f.kv cite a {'
    + 'color: #226d06;'
    + '}'
);