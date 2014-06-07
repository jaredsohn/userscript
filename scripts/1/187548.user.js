// ==UserScript==
// @name        DeviantArt Auto-Zoom
// @namespace   http://userscripts.org/users/74856
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include     *.deviantart.com/art/*
// @include     www.deviantart.com/art/*
// @include     *.deviantart.com/*
// @version     1.5
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    var i = 0;
    
    function zoomerManager()
    {
        var hndl = window.setInterval(function(){zoomer(hndl)}, 1000);
    }
    
    function zoomer(hndl)
    {
        if(i>10)
        {
            window.clearInterval(hndl);
            i=0;
        }
        i++;
        if($(".dev-page-view").length)
        {
            if(!$(".dev-page-view").hasClass("view-mode-full"))
            {
                $(".dev-content-normal").trigger("click");
            }
            else
            {
                window.clearInterval(hndl);
                i=0;
            }
            
            $(".dev-page-view").on("mousedown", "div.tinythumb", zoomerManager);
        }
    }
    
    $(".browse-content").on("mousedown", "a.thumb", zoomerManager);
    
    zoomerManager();
});