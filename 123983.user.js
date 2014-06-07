// ==UserScript==
// @name          HTTPS Youtube
// @author        TheGreshProject
// @description	  Takes you from HTTP to the old HTTPS Youtube.
// @include        http://www.youtube.com/
// ==/UserScript==

function ()
    {
        location.href = location.href.replace(/http://www.youtube.com\:/, 'https://www.youtube.com/');
    }