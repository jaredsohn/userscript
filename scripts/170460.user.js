// ==UserScript==
// @name       Highlight AHD Internal Torrents
// @namespace  https://awesome-hd.net/
// @version    0.1
// @description  Highlights internal torrent
//
// Preference window for userscripts:
// @require 	http://userscripts.org/scripts/source/107512.user.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
//
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_registerMenuCommand
// @grant		GM_addStyle
//
// @match      https://awesome-hd.net/*
// ==/UserScript==
jQ = jQuery.noConflict(true);

// Default preferences are stored in two places: defaults settings      
// for USP (here) and defaults for GM_getValue (below).  Make sure to   
// change both if you change one. 
try {
    USP.theScriptName = 'Highlight AHD Internals';
    USP.init({
        theName: 'bgcolour',
        theText: 'Background Colour:',
        theDefault: 'yellow'
    },{
        theName: 'textcolour',
        theText: 'Text Colour:',
        theDefault: 'white'
    });
    GM_registerMenuCommand('Preferences for ' + USP.theScriptName, USP.invoke);
} catch (e) {};

// Default preferences are stored in two places: defaults settings for  
// USP (above), and defaults for GM_getValue (below).  Make sure to     
// change both if you change one. 
var bgcolour = GM_getValue('bgcolour', 'yellow');
var textcolour = GM_getValue('textcolour', 'white');

/*document.body.innerHTML = document.body.innerHTML.replace(/75% Freeleech/g, function(m){
    return '<span style="background-color:'+bgcolour+';color:'+textcolour+'">'+m+'</span>'
});*/

jQ('*:contains("75% Freeleech")').each(function(){
     if(jQ(this).children().length < 1) 
          jQ(this).css("background-color",bgcolour,"color",textcolour) });