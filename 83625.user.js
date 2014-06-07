// ==UserScript==
// @name           Imdb top 250 year highlight
// @namespace      imdb
// @description    highlight movie year rows
// @include        http://www.imdb.com/chart/top
// @version 1.0.0
// @author nick2009
// @require http://sizzlemctwizzle.com/updater.php?id=83625&days=1
// ==/UserScript==

// Row highligher script for  http://www.imdb.com/chart/top
// Highlights a row based on the year - currently only works for last 10 years. (2010-2000)

// Add jQuery - from http://11heavens.com/using-greasemonkey-to-load-and-use-jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();

           jQuery(document).ready(function() {          
            jQuery('#main table tbody tr td:contains(2010)').parent().css({ 'background-color' : '#fec715' });  // yellow
	    jQuery('#main table tbody tr td:contains(2009)').parent().css({ 'background-color' : '#f68c1e' });  // orange
	    jQuery('#main table tbody tr td:contains(2008)').parent().css({ 'background-color' : '#f46066' });  //red
	    jQuery('#main table tbody tr td:contains(2007)').parent().css({ 'background-color' : '#f972c2' }); // dark pink
            jQuery('#main table tbody tr td:contains(2006)').parent().css({ 'background-color' : '#fdcce2'}); // light pink
	    jQuery('#main table tbody tr td:contains(2005)').parent().css({ 'background-color' : '#c995cd' });  // purple
            jQuery('#main table tbody tr td:contains(2004)').parent().css({ 'background-color' : '#3bb9eb' });  // light blue
	    jQuery('#main table tbody tr td:contains(2003)').parent().css({ 'background-color' : '#5285c5' });  // dark blue
            jQuery('#main table tbody tr td:contains(2002)').parent().css({ 'background-color' : '#00a650' });  // dark green
	    jQuery('#main table tbody tr td:contains(2001)').not(':contains(Odyssey)').parent().css({ 'background-color' : '#aac127' });   // light green
	    jQuery('#main table tbody tr td:contains(2000)').parent().css({ 'background-color' : '#bebebe'}); // grey
        });
}, false);