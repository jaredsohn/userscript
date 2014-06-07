// ==UserScript==
// @name          JqueryContentIndexer
// @require    http://www.wisdombay.com/jci/jquery-1.3.2.min.js
// @require    http://www.wisdombay.com/jci/jquery.content-indexer.js
// @namespace      http://www.hbirddesigns.com/labs/jciGm
// @description	  Greasemonkey Script which adds Jquery Content Indexer Plugin Specifically for WIkipedia
// @author        Pramod S Nair
// @homepage      http://www.hbirddesigns.com
// @include       http://en.wikipedia.org/*
// ==/UserScript==



$(document).ready( function() { 
$('h1,h2').createIndex({'animateScroll':'yes','followPageScroll':'yes','scrollDelay':1000,'menuTitle':'Click here to Navigate this page','activateGoTop':'yes','easingEnable':'no','easingMethod':'slide','menuStyle':'float','normalMenuPositionSelector':'h1:not(.pageheader):first'});
// Add jQuery Content Indexer Style Sheet
var pagecontent_css = {
  'position': 'absolute',
  'text-align': 'left',
  'top': '0',
  'right': '0',
  'width':'300px',
  'display':'block',
  'border': '1px solid #AAAAAA',
  'border-top-width': '0',
  'background-color': '#F9F9F9',
  'font-family' : 'Georgia',
  'font-size' : '12px',
  'color' : '#000000',
  '-moz-opacity':'0.9',
  'z-index':'99999',
  'text-align':'center'
    }
$('#page-contents').css(pagecontent_css);
var pagecontent_a_css = {
  'display': 'block',
  'margin': '.25em 0',
 'color' : '#000000',
  'text-decoration':'none'
}
$('#page-contents a').css(pagecontent_a_css);
var pagecontent_a_togle = {
  'padding-left': '20px',
  'text-decoration': 'none'
}
$('#page-contents a.toggler').css(pagecontent_a_togle);
var pagecontent_footer = {
  'display':'block',
  'background-color': '#F9F9F9 !important',
  'font-family' : 'Georgia',
  'font-size' : '10px',
  'background-image':'url(http://www.wisdombay.com/jci/bird.gif)',
  'background-position':'270px center',
  'background-repeat':'no-repeat',
  'color' : '#333333',
 'text-align':'center !important',
 'padding': '.25em .5em .5em',  
  'border': '1px solid #cccccc',
}
$('#page-contents-footer').css(pagecontent_footer);
var pagecontent_div = {
'display':'none',
  'padding': '.25em .5em .5em',  
  'border': '1px solid #cccccc',
  'background-color': '#FFFFFF',
  'text-align':'left'
}
$('#page-contents div#page-content-links').css(pagecontent_div);

var content_toplink = {
  'float':'right'
}
$('.content-indexer-toplink').css(content_toplink);
var content_pagetop = {
  'padding':'0',
'margin':'0',
'position':'absolute',
'top':'0',
'left':'0',
'width':'0',
'height':'0'
}
$('#content-indexer-pagetop').css(content_pagetop);
 });
