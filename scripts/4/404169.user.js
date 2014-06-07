// ==UserScript==
// @name       Dota Cinema auto hide logos
// @version    0.1
// @description	Automatically hides team logos
// @match      http://www.dotacinema.com/*
// @copyright  2014+, SpringGreen.nl
// @include	   http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

$(document).ready(function() {
   
    if ($('#spoilerstoggle').attr('title') == 'Hide Logos') {
     
        $('#spoilerstoggle').click();
        
    }
    
});