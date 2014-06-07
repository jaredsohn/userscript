// ==UserScript==
// @name           Wikipedia
// @description    improve Wikipedia display
// @include        http://*.wikipedia.*
// @include        https://*.wikipedia.*

// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Styles
addGlobalStyle('* {font-family: sans-serif!important;}');
addGlobalStyle('a, a:visited, a:active {text-decoration:none!important;color:#104E8B!important}');
addGlobalStyle('a:hover{text-decoration:none;color:#26466D;background-color:#C6E2FF;}');
addGlobalStyle('a.new, a.new:visited, a.new:active {color:#A62A2A!important}');
addGlobalStyle('a:hover{text-decoration:none!important;color:#26466D!important;background-color:#C6E2FF!important;}');
addGlobalStyle('a.new:hover{text-decoration:none!important;color:#A62A2A!important;background-color:#FFCCCC!important;}');
addGlobalStyle('body, #mw-page-base, #mw-head-base {background-image:none!important;background-color:#F3F3F3!important;}');
addGlobalStyle('#bodyContent{font-size:0.86em!important;padding:1em!important}');
addGlobalStyle('p{line-height:1.6em!important}');
addGlobalStyle('blockquote{font-style:italic!important;padding:0.5em 1.4em!important;background-color:#F5F5F5}');
addGlobalStyle(' p.Zitat {font-size:0.95em!important}');
addGlobalStyle(' p.cite {font-size:0.8em!important;margin-top:0.5em}');


// hide ads
addGlobalStyle('#centralNotice  {display:none}');

// structure
addGlobalStyle('#p-logo, #p-views, #footer, #p-personal, #p-namespaces, #p-cactions{display:none}');
addGlobalStyle('#mw-panel{font-size:0.9em!important;padding:0 0 0 15px!important}');


// restyle content
addGlobalStyle('#content {background-image:none!important;width:65%!important; color:#262626!important;margin-left:13em!important;padding:1.5em!important}');
addGlobalStyle('#toc {font-size:0.8em;margin-top:1em!important;margin-bottom:1em!important;border:none!important;background-color:#EDEDED!important}');
addGlobalStyle('#toc #toctitle, .toc #toctitle, #toc .toctitle, .toc .toctitle, #toctitle h2{text-align:left!important;font-weight:normal!important}');
addGlobalStyle('#toctitle h2{text-align:left!important;font-weight:normal!important;font-size:1.2em!important}');
addGlobalStyle('.toctoggle{font-size:1.0em!important;opacity:0.5}');

addGlobalStyle('ul li{list-style-image:url(http://upload.wikimedia.org/wikipedia/commons/b/bd/Grey_Square_12.gif); margin-left:20px!important}');

addGlobalStyle('#Vorlage_Dieser_Artikel, #Vorlage_Uberarbeiten{border:none!important;background-color:#EDEDED!important}');
addGlobalStyle('.editsection{display:none}');
addGlobalStyle('h1, h2, h3, h4, h5, h6 {border:none!important; color:#454545!important}');

addGlobalStyle('h1 {font-size:2em!important;line-height:2em!important;}');
addGlobalStyle('h2 {font-size:1.7em!important;line-height:1.7em!important;font-weight:bold!important;margin-top:0.7em!important;}');
addGlobalStyle('h3 {font-size:1.6em!important;line-height:1.6em!important;font-weight:normal!important}');

addGlobalStyle('h2 .mw-headline {background-color:#FFE6D3}');
addGlobalStyle('h3 .mw-headline {background-color:#FFFFCC}');


addGlobalStyle('div.hauptartikel{font-size:0.9em!important}');
addGlobalStyle('span.hauptartikel-text, span.sieheauch-text{background-color:#FFFFF0}');

addGlobalStyle('sup.reference {font-size:0.6em!important}');

addGlobalStyle('div.thumbinner, div.flaggedrevs_short{border:none!important;background-color:#EDEDED!important}');

// tables
addGlobalStyle('table.wikitable, .wikitable th, .wikitable td {border:none!important;font-size:0.9em!important;line-height:1.6em!important}');
addGlobalStyle('tr {vertical-align: top!important}');
addGlobalStyle('td {padding:5px!important;}');
addGlobalStyle('.wikitable th {text-align:left!important;padding:5px!important;}');


// category links at footer
addGlobalStyle('.catlinks, div.NavFrame {border:none!important;background-color:#EDEDED!important}');


//hide parts of left bar
addGlobalStyle('#p-Mitmachen {display:none}');

// search field
addGlobalStyle('div#simpleSearch {border:1px solid #dedede!important}');
addGlobalStyle('#right-navigation {float:none; margin-left:13em;margin-top:1em!important}');
addGlobalStyle('#p-search {margin-left:none!important; margin-bottom:0.8em}');
// addGlobalStyle('#div#simpleSearch, input#searchInput {}');
addGlobalStyle('#searchButton, #searchInput {background-color:#fff!important}');
addGlobalStyle('div#simpleSearch {border:none!important}');

