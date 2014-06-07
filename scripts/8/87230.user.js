// ==UserScript==
// @name          Visualize
// @namespace     http://localhost
// @description	  Greets the world
// @include       http://facebook.com/*
// @include       http://www.facebook.com/*
// @require       http://code.jquery.com/jquery-1.4.1.min.js
// ==/UserScript==


var url = 'http://localhost/fbhack/test.html';

var links = $('h2.uiHeaderTitle')[0];


$(links).append(' \267 <a href="#" id="addLink" style="font-weight:bold;font-size:20pt;">Visualize</a>');


var addLinkToggled = false;

$('#addLink').click(function(){
    if (addLinkToggled){
        $(this).text("Visualize");
        $('#newFrame').remove();
        addLinkToggled = false;
    }
    else {
        $('#pagelet_home_stream').prepend('<iframe id="newFrame" width="100%" height="400px" scrolling="no" style="border:none;"/>'); 
        $('#newFrame').attr('src', url); 
         $(this).text("Unvisualize");       
        addLinkToggled = true;
    }
});
