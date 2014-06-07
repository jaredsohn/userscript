// ==UserScript==
// @name        Wikipedia goes 3 columns
// @description Display wikipedia article text in 3 columns for widescreen displays
// @namespace   sepa.spb.ru
// @version     2014.03.02
// @include     http://*.wikipedia.org/*
// @include     https://*.wikipedia.org/*
// @exclude     http://*.wikipedia.org/wiki/Main_Page
// @icon        http://en.wikipedia.org/favicon.ico
// @grant       GM_getResourceText
// @updateURL   http://userscripts.org/scripts/source/157113.user.js
// @require     http://code.jquery.com/jquery-latest.min.js
// @author      i@sepa.spb.ru
// ==/UserScript==

//heredoc js wrapper ;)
function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

//css
var css = hereDoc(function() {/*!
.div-col {
  -moz-column-count: 3;
  -moz-column-gap: 30px;
  column-count: 3;
  column-gap: 30px;
  text-align: justify;
}

table#toc {
  background: inherit;
  border: 0 none;
  font-size: 12px;
  padding: 0;
}
#toc, .toc, .mw-warning { border: none; font-size: 80%; }
table.infobox, table.vertical-navbox {
  border: 0 none !important;
  float: none;
  font-size: 11px !important;
  margin: 0;
  padding: 0 !important;
  width: inherit !important;
  background: inherit;
  text-align: left;
}

#toctitle h2 {
  position: inherit;
  text-align: left !important;
}
#toctitle {
  text-align: left !important;
}
body.mediawiki table.mbox-small-left, table.ambox { margin: 0; width: inherit; }
body.mediawiki table.mbox-small { width: inherit; margin: 4px 0; float: none; clear: none;}
html .thumbimage { border: none;}
div.tright, div.tleft  { margin: 0;}
div.tright, div.tleft, div.floatright, div.floatleft, table.floatright, table.floatleft { float: none; clear: none; }
div#mw-panel {width: 16em; overflow: auto; padding-top: 200px; top: 0;}
#p-logo {left: 3.5em; top:0;}
#left-navigation {margin-left: 17em;}
#mw-head-base {margin-left: 17em;}
div#content {margin-left: 17em;}
div.mw-code, pre {overflow: auto;}
div#footer {margin-left: 16em;}

#p-navigation, #p-interaction, #p-tb, #p-coll-print_export, #p-participation, #siteNotice {display: none;}
*/}); 

//apply custom CSS
var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML = css;
document.documentElement.appendChild(s);

//move tables to left
$("#mw-panel").append($("#toc"));
$("#mw-panel").append($("table.vertical-navbox"));
$("#mw-panel").append($("table.infobox"));
$("#mw-panel").append($("table.metadata.mbox-small"));

//wrap contents to div-col, split by H2
var n=$("#mw-content-text").children();
$("#mw-content-text").prepend("<div class='div-col'/>");   
var d=$("div.div-col").last();
for(var i=0; i<n.length-1; i++){
  if( n[i].nodeName=="TABLE" && ($(n[i]).hasClass("wikitable") || $(n[i]).hasClass("navbox")) ){
    $(n[i]).after("<div class='div-col'/>");
    d=$("div.div-col").last();
    continue;
  }
  else if(n[i].nodeName!="H2") {
    $(d).append(n[i]);
  }
  else {
    $(n[i]).after("<div class='div-col'/>");
    d=$("div.div-col").last();
  }
}

//remove width/height from images
$('img').removeAttr('width').removeAttr('height');
$('div.thumbinner').removeAttr('style');
$('div.noresize').removeAttr('style');
$('table.wikitable').removeAttr('style');
var w=$( window ).width();
$('div.thumb .thumbimage, div.noresize img, div.floatnone img, div.div-col img, div.div-col pre, div.div-col .mw-code').css('max-width','calc( ('+w+'px - 17em - 120px)/3 - 30px )');

//collapse languages
$('#p-lang').removeClass('expanded').addClass('collapsed');
$('#p-lang div.body').css('display','none');
