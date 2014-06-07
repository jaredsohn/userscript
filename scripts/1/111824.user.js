// ==UserScript==
// @name           iTHelp Highlight
// @namespace      ithelp.ithome.com.tw
// @include        http://ithelp.ithome.com.tw/*
// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 
     jQuery = unsafeWindow['jQuery'];
     jQuery.noConflict();

     jQuery(document).ready(function() {
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
        jQuery('a:contains(userid),ol li:contains(userid)').css({ 'background-color' : '#000000' });  //Common ID
     }
  );
}, false);