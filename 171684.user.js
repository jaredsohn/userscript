// ==UserScript==
// @name       The Pirate Bay Quality Check
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @description  Share 
// @match      http://thepiratebay.*/*
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {
    
    var title = '';
    $('table#searchResult tr').each(function() {
        title = $(this).find('div.detName').text();
        console.log('title ' + title);
        badmovie = false;
        
        if(title.lastIndexOf('CAM') > 0) badmovie = true;
        if(title.lastIndexOf('TS') > 0) badmovie = true;
        if(title.lastIndexOf('SCR') > 0) badmovie = true;
        if(title.lastIndexOf('Scr') > 0) badmovie = true;
        if(title.lastIndexOf('WEBRip') > 0) badmovie = true;
        
        
        if(badmovie) $(this).css('background-color','#FCC');
        if(title.lastIndexOf('BRRip') > 0) $(this).css('background-color','#CFC');
        if(title.lastIndexOf('HDRip') > 0) $(this).css('background-color','#CFC');
        
    });
    
	
});