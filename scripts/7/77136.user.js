// Version:      0.1 
// Release Date: 2010-05-19
// Author: Gary M. Josack <gary@byoteki.com>
// 
// ==UserScript==
// @name          Digg Fix Facebook Share
// @namespace     http://josack.com/userscripts/
// @description   This script changes the facebook share links on digg.com to use the actual article instead of linking back to Digg.
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

var fbshare = "http://www.facebook.com/sharer.php?u=";

var title_elem = document.getElementById("title");
var fb_elem    = document.getElementById("facebook");
var news_elems = document.getElementsByClassName('news-summary');  
if ( !!title_elem && !!fb_elem )
{
    fb_elem.setAttribute("href", 
        fbshare + escape(title_elem.childNodes[1])
    );
} 
else if ( !!news_elems )
{
    for (var idx = 0; idx < news_elems.length; idx++)
    {
        var url = news_elems[idx].getElementsByClassName('offsite')[0]
        var fb  = news_elems[idx].getElementsByClassName('facebook')[0]
        if ( !!fb )
        {
            fb.firstChild.setAttribute("href", fbshare + escape(url))
        }
    }
}

