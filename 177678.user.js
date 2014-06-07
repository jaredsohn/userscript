// ==UserScript==
// @name        Thread finder
// @namespace   grixm-tf
// @description When visiting the catalog of a 4chan board, find and jump to a certain thread
// @include     http://boards.4chan.org/int/catalog
// @include     https://boards.4chan.org/int/catalog
// @version     1
// @grant       none
// ==/UserScript==



document.body.onload = function()
    {
    //Edit this string to jump to other threads
    var string="日本語ス";
    
    var teasers=document.querySelectorAll("div.teaser");
    var max=teasers.length;
    var i=0;
    
    while (i<max)
        {
        console.log(i);
        if (teasers[i].textContent.indexOf(string) > -1)
            {
            window.location = teasers[i].parentNode.querySelectorAll("a")[0].href;
            console.log(i);
            break;
            }
        else   
            i += 1;
        }
    }