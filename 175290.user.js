// ==UserScript==
// @name        UltimateCollmex
// @namespace   http://ibdigital.de
// @include     https://www.collmex.de/cgi-bin/cgi.exe?*
// @version     1
// @description Fixes UI Bugs at collmex.de
// @copyright  2013, Mathias Uhl 
// ==/UserScript==


// add jQuery
var JQ   = document.createElement('script');
JQ.src   = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
JQ.type  = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(JQ);

setTimeout( function(){
        
    // Dokument Erfassung PDF Viewer breit genug
    $('#content object').css('width','900px');
        
    // alles was drucken ist bitte im neuen Fenster aufmachen
    $('.drucken').attr("target","_blank");

}, 200);



