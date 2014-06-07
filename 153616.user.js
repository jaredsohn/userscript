// ==UserScript==
// @name           Reblog notifications
// @namespace      Kamille
// @description    Be able to click reblog from your notes
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
var $j = jQuery.noConflict();
function set_reblog_links() {
	var notes = document.getElementsByClassName("action");	
    if (notes != null) {
        for (var i=0; i<notes.length; i++) {            
            var replaced = notes[i].getAttribute("replaced");                        
            if (!replaced) {
                var link = notes[i].getAttribute("data-post-url");        
                if (link != null) {
                    var noteInnerHtml = notes[i].innerHTML;
                    var reblogLink = "<a href=\""+link+"\" class=\"_blank\">reblogged this from</a>";
                    noteInnerHtml = noteInnerHtml.replace("reblogged this from", reblogLink);
                    notes[i].innerHTML = noteInnerHtml;                
                }
            }
            notes[i].setAttribute("replaced", true);
        }
    }
	
}
setInterval(set_reblog_links, 200);