// ==UserScript==
// @name Scriptlance Highlight row
// @namespace namespace
// @description Highlights rows for buyers with atleast 1 feedback.
// @author Nick
// @homepage 
// @include https://www.scriptlance.com/cgi-bin/freelancers/search.cgi*
// @include https://www.scriptlance.com/programmers/projects.shtml*
// ==/UserScript==
 

// Add jQuery - from http://11heavens.com/using-greasemonkey-to-load-and-use-jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();

           jQuery(document).ready(function() {          
            jQuery('html body table tbody tr td table tbody tr td p table tbody tr td:contains(reviews), html body table tbody tr td table tbody tr td p table tbody tr td:contains(review)').parent().css({
			'background-color' : '#c4fcc9',
			});
        });
}, false);