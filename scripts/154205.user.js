// ==UserScript==
// @name           Block button mover
// @namespace      Kamille
// @description    move block button that's blocking reply button
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
var $j = jQuery.noConflict();
function remove_block_button() {
	var notes = document.getElementsByClassName("block");	
    if (notes != null) {
        for (var i=0; i<notes.length; i++) {            
            var replaced = notes[i].getAttribute("replaced");                        
            if (!replaced) {                
				notes[i].style.marginRight="20px";
            }
            notes[i].setAttribute("replaced", true);
        }
    }
	
}
setInterval(remove_block_button, 200);